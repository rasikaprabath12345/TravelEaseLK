# TravelEaseLK — The ULTIMATE Interview Mastery Guide

> **Every answer here is based on real code read from this project.** This covers every OOP concept, every design pattern, every role-based logic, and every tricky question an intern interviewer could possibly ask. Read this once — walk in with 1000% confidence.

---

## ═══════════════════════════════════════════
## SECTION 1 — HOW THE FULL SYSTEM WORKS
## ═══════════════════════════════════════════

### The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER / USER                       │
└───────────────────────────┬─────────────────────────────────┘
                            │ Click / Form Submit
                            ▼
┌─────────────────────────────────────────────────────────────┐
│          NEXT.JS FRONTEND  (Port 3000)                      │
│  ┌──────────────┐  ┌────────────┐  ┌────────────────────┐  │
│  │ React Hook   │  │  Zustand   │  │   React Query      │  │
│  │ Form + Zod   │  │   Store    │  │  (Data Fetching)   │  │
│  └──────────────┘  └────────────┘  └────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ Axios HTTP (JWT in Header)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│          ASP.NET CORE API  (Port 5000)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Layer   → Controllers (thin, no logic)          │   │
│  │  App Layer   → Services   (all business logic)       │   │
│  │  App Layer   → Interfaces (abstractions / contracts) │   │
│  │  Infra Layer → Repositories + UnitOfWork + DbContext │   │
│  │  Domain Layer → Entities (User, Package, Booking)    │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ EF Core → SQL Queries
                            ▼
┌─────────────────────────────────────────────────────────────┐
│          SQL SERVER DATABASE                                │
│   Users | Packages | Bookings | Destinations | Blogs ...   │
└─────────────────────────────────────────────────────────────┘
```

---

## ═══════════════════════════════════════════
## SECTION 2 — OOP CONCEPTS (EVERY SINGLE ONE)
## ═══════════════════════════════════════════

### 1. ENCAPSULATION — "Hiding data and internal details"

**Real Code Example:**
In `AuthService.cs`, the password hashing and JWT generation are `private` methods:
```csharp
private string HashPassword(string password)
    => BCrypt.Net.BCrypt.HashPassword(password);

private bool VerifyPassword(string password, string hash)
    => BCrypt.Net.BCrypt.Verify(password, hash);

private string GenerateJwtToken(User user) { ... }
```
**Why it matters:** No other class in the system can call these methods directly. Only `AuthService` can hash a password. This protects sensitive logic from being misused.

**Also in DTOs:** The `PasswordHash` field inside the `User` entity is NEVER sent to the frontend. The `AuthResponseDto` contains only `Token`, `Email`, `Role` — encapsulating away the sensitive database fields.

---

### 2. ABSTRACTION — "Showing only what is needed, hiding how it works"

**Real Code Example:**
`IRepository<T>` defines WHAT operations exist. It does NOT say HOW they work:
```csharp
public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    IQueryable<T> Query();
}
```
`PackageService` calls `_unitOfWork.Repository<Package>().GetAllAsync()`. It has zero knowledge of SQL Server, EF Core, or how the database query runs. The Service only knows "there is a method `GetAllAsync()` that returns packages."

**Also:** `IAuthService`, `IBookingService`, `IPackageService` — all interfaces defining contracts that hide implementation details.

---

### 3. INHERITANCE — "Child classes reusing parent class properties/methods"

**Real Code Example 1 — BaseEntity:**
```csharp
// Parent (Abstract) — TravelEase.Domain/Entities/BaseEntity.cs
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

// Children — ALL inherit Id, CreatedAt, UpdatedAt automatically
public class User : BaseEntity { ... }       // User.Id, User.CreatedAt ✓
public class Package : BaseEntity { ... }    // Package.Id, Package.CreatedAt ✓
public class Booking : BaseEntity { ... }    // Booking.Id, Booking.CreatedAt ✓
public class PackageImage : BaseEntity { ... }
```
Without inheritance, we'd have to write `public int Id { get; set; }` and `CreatedAt` in every single entity — 12 times over. Inheritance eliminates this duplication.

**Real Code Example 2 — ControllerBase:**
```csharp
public class PackagesController : ControllerBase   // Inherits from ASP.NET's ControllerBase
```
`ControllerBase` gives all controllers access to `Ok()`, `NotFound()`, `BadRequest()`, `Forbid()` methods without us writing them.

---

### 4. POLYMORPHISM — "One interface, many implementations / behaviours"

**Real Code Example 1 — Runtime Polymorphism via Dependency Injection:**
The `UnitOfWork` creates `Repository<T>` dynamically at runtime:
```csharp
public IRepository<T> Repository<T>() where T : BaseEntity
{
    var type = typeof(T).Name;
    if (!_repositories.ContainsKey(type))
    {
        var repositoryInstance = new Repository<T>(_context); // Created at runtime
        _repositories.Add(type, repositoryInstance);
    }
    return (IRepository<T>)_repositories[type]!;
}
```
When `BookingService` calls `_unitOfWork.Repository<Booking>()`, it gets a `Repository<Booking>`. When `PackageService` calls `_unitOfWork.Repository<Package>()`, it gets a `Repository<Package>`. Same interface, different concrete type at runtime.

**Real Code Example 2 — Switch Expression Polymorphism (PackageService sorting):**
```csharp
query = sortBy?.ToLower() switch
{
    "price_asc"  => query.OrderBy(p => p.Price),
    "price_desc" => query.OrderByDescending(p => p.Price),
    "rating"     => query.OrderByDescending(p => p.AverageRating),
    "newest"     => query.OrderByDescending(p => p.CreatedAt),
    _            => query.OrderByDescending(p => p.IsFeatured)
};
```
The same `query` variable behaves differently depending on the `sortBy` value. One variable, many behaviours.

---

### 5. GENERICS — "Type-safe reusable code"

**Real Code Example:**
```csharp
public interface IRepository<T> where T : BaseEntity  // Generic Interface
public class Repository<T> : IRepository<T> where T : BaseEntity  // Generic Class
```
`where T : BaseEntity` is a **Generic Type Constraint**. It means `T` can ONLY be a class that extends `BaseEntity`. This gives us one reusable Repository class that works for ALL entities: `Repository<User>`, `Repository<Package>`, `Repository<Booking>`, `Repository<Blog>` etc.

Without Generics, we'd need to write a `UserRepository`, `PackageRepository`, `BookingRepository` etc. — all with identical code.

---

### 6. ABSTRACT CLASSES vs INTERFACES (Important distinction!)

| Feature | `BaseEntity` (Abstract Class) | `IRepository<T>` (Interface) |
|---|---|---|
| **Can have implementation?** | YES — `CreatedAt = DateTime.UtcNow` | NO — only method signatures |
| **Can have fields/state?** | YES — `Id`, `CreatedAt`, `UpdatedAt` | NO |
| **How used?** | Inherited (`class User : BaseEntity`) | Implemented (`class Repository<T> : IRepository<T>`) |
| **Purpose** | Share common properties | Define a contract/behaviour |

**Interview Answer:** "I used `BaseEntity` as an abstract class because it has actual shared state (`Id`, `CreatedAt`) that child entities need. I used interfaces like `IRepository<T>` for defining contracts because the actual implementation differs (it uses EF Core), and interfaces allow for loose coupling and easy testing."

---

## ═══════════════════════════════════════════
## SECTION 3 — DESIGN PATTERNS USED
## ═══════════════════════════════════════════

### 1. Repository Pattern
**What:** Abstracts the database layer behind an interface.
**Where:** `IRepository<T>` + `Repository<T>`
**Why:** The Application layer (Services) never directly touches EF Core or SQL Server. If we switch from EF Core to Dapper tomorrow, only `Repository<T>` changes. Zero changes to `BookingService` or `PackageService`.

### 2. Unit of Work Pattern
**What:** Groups multiple database operations into a single transaction.
**Where:** `IUnitOfWork` + `UnitOfWork.cs`
**Key insight from real code:** When creating a booking, the code does TWO things:
```csharp
package.AvailableSeats -= totalGuests;
await _unitOfWork.Repository<Package>().UpdateAsync(package);
await _unitOfWork.Repository<Booking>().AddAsync(booking);
await _unitOfWork.SaveChangesAsync(); // ONE commit for BOTH changes
```
If `SaveChangesAsync()` fails, both the Package seat update and the Booking creation are rolled back. Atomicity is guaranteed.

### 3. Dependency Injection (DI) Pattern
**What:** Classes receive their dependencies from outside (via constructor) rather than creating them.
**Where:** Every Controller and Service uses Constructor Injection:
```csharp
public PackagesController(IPackageService packageService) // Injected by .NET DI
{
    _packageService = packageService;
}
```
**Why:** Testability. In unit tests, you can inject a fake/mock `IPackageService` instead of the real one, so tests run without needing a database.

### 4. Soft Delete Pattern
**What:** Instead of permanently deleting a record, mark it as inactive.
**Where — Real code from `PackageService.DeleteAsync()`:**
```csharp
public async Task<bool> DeleteAsync(int id)
{
    var package = await _unitOfWork.Repository<Package>().GetByIdAsync(id);
    if (package == null) return false;

    package.IsActive = false;  // Soft delete — record stays in DB
    package.UpdatedAt = DateTime.UtcNow;
    await _unitOfWork.Repository<Package>().UpdateAsync(package);
    await _unitOfWork.SaveChangesAsync();
    return true;
}
```
And all read queries filter it out automatically: `.Where(p => p.IsActive)`
**Why:** Data is never permanently lost. Deleted packages can be restored by setting `IsActive = true`. Also useful for audit trails and reporting.

### 5. DTO (Data Transfer Object) Pattern
**What:** Separate classes for transferring data across layer boundaries.
**Why 3 reasons:**
1. **Security:** `User` entity has `PasswordHash`. `AuthResponseDto` never exposes it.
2. **Shape:** `BookingDto` includes `PackageName` (a join from another table) — something the raw `Booking` entity doesn't have.
3. **Versioning:** API response shape can change without touching Domain entities.

---

## ═══════════════════════════════════════════
## SECTION 4 — ROLE-BASED AUTHORIZATION (DEEP DIVE)
## ═══════════════════════════════════════════

The system has two roles: **Admin** and **Customer**. The role is stored in the JWT Token as a Claim.

### How Roles Are Assigned
```csharp
// User.cs — Default role is "Customer"
public string Role { get; set; } = "Customer"; // Customer, Admin

// AuthService.RegisterAsync — Every new user gets "Customer" role
var user = new User { ..., Role = "Customer" };
```

### How Roles Are Embedded in JWT
```csharp
// AuthService.GenerateJwtToken()
var claims = new[]
{
    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    new Claim(ClaimTypes.Email, user.Email),
    new Claim(ClaimTypes.Role, user.Role),   // "Admin" OR "Customer"
    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
};
```

### How Authorization is Enforced at Controller Level

**Pattern 1 — Entire Controller locked to Admin only (`DashboardController`):**
```csharp
[Authorize(Roles = "Admin")]  // ALL endpoints in this controller need Admin
public class DashboardController : ControllerBase { ... }
```

**Pattern 2 — Controller open to all authenticated users, specific endpoints locked:**
```csharp
[Authorize]  // Everyone must be logged in
public class BookingsController : ControllerBase
{
    // Customers can access this, but only see THEIR OWN bookings
    [HttpGet]
    public async Task<IActionResult> GetAll(...)
    {
        int? userId = GetUserRole() == "Admin" ? null : GetUserId();
        // Admin: userId = null → sees all bookings
        // Customer: userId = their ID → sees only their bookings
    }

    // ONLY Admin can update booking status
    [Authorize(Roles = "Admin")]
    [HttpPut("status")]
    public async Task<IActionResult> UpdateStatus(...) { ... }
}
```

**Pattern 3 — Mixed: Public GET, Admin-only POST/PUT/DELETE (`PackagesController`):**
```csharp
[HttpGet]           // Anyone (even non-logged-in) can browse packages
public async Task<IActionResult> GetAll(...) { ... }

[Authorize(Roles = "Admin")]
[HttpPost]           // ONLY Admin can create packages
public async Task<IActionResult> Create(...) { ... }

[Authorize(Roles = "Admin")]
[HttpPut]            // ONLY Admin can edit packages
public async Task<IActionResult> Update(...) { ... }
```

**Pattern 4 — Row-Level Security (`BookingsController.GetById`):**
```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetById(int id)
{
    var booking = await _bookingService.GetByIdAsync(id);
    if (booking == null) return NotFound(...);

    // A Customer cannot view ANOTHER Customer's booking
    if (GetUserRole() != "Admin" && booking.UserId != GetUserId())
        return Forbid();  // 403 Forbidden

    return Ok(new { success = true, data = booking });
}
```

**Pattern 5 — Role check without `[Authorize]` attribute (`BlogsController`):**
```csharp
[HttpGet]
public async Task<IActionResult> GetAll(...)
{
    bool? filterPublished = isPublished;
    if (!User.IsInRole("Admin"))  // Non-admins can only see published blogs
    {
        filterPublished = true;
    }
    // Admin can see drafts. Everyone else only sees published posts.
}
```

### JWT Helper Methods (Real code in `BookingsController`)
```csharp
// Extract UserId from JWT token — CANNOT be faked by the client
private int GetUserId()
    => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

// Extract Role from JWT token
private string GetUserRole()
    => User.FindFirst(ClaimTypes.Role)?.Value ?? "";
```

---

## ═══════════════════════════════════════════
## SECTION 5 — KEY BUSINESS LOGIC EXPLAINED
## ═══════════════════════════════════════════

### Booking Price Calculation
```csharp
// Children get 30% discount (pay 70% of adult price)
var totalPrice = (dto.NumberOfAdults * package.Price)
              + (dto.NumberOfChildren * (package.Price * 0.7m));
```
The `m` suffix = forces `decimal` type (not `double`) — critical for money to avoid floating-point precision errors.

### Unique Booking ID Generation
```csharp
var bookingCount = await _unitOfWork.Repository<Booking>().Query().CountAsync();
var bookingId = $"TE{DateTime.UtcNow.Year}{(bookingCount + 1).ToString().PadLeft(4, '0')}";
// Result: "TE20260001", "TE20260002", etc.
```

### Seat Inventory Management
```csharp
// On booking CREATION — deduct seats
package.AvailableSeats -= totalGuests;

// On booking CANCELLATION — restore seats
if (dto.Status == "Cancelled" && oldStatus != "Cancelled")
{
    package.AvailableSeats += booking.NumberOfAdults + booking.NumberOfChildren;
}
```

### Automatic Payment Status on Confirmation
```csharp
if (dto.Status == "Confirmed" || dto.Status == "Completed")
{
    booking.PaymentStatus = "Paid"; // Auto-mark as paid when Admin confirms
}
```

### Package Filtering & Sorting (Real code)
```csharp
query = sortBy?.ToLower() switch
{
    "price_asc"  => query.OrderBy(p => p.Price),
    "price_desc" => query.OrderByDescending(p => p.Price),
    "rating"     => query.OrderByDescending(p => p.AverageRating),
    "newest"     => query.OrderByDescending(p => p.CreatedAt),
    _            => query.OrderByDescending(p => p.IsFeatured) // Default
};
```

### Image Management (Replace-All Strategy)
When an Admin updates a Package, the system replaces ALL images:
```csharp
// Delete old images first
foreach (var img in existingImages)
    await _unitOfWork.Repository<PackageImage>().DeleteAsync(img);

// Add new images with order index
foreach (var (url, index) in dto.Images.Select((url, index) => (url, index)))
    await _unitOfWork.Repository<PackageImage>().AddAsync(new PackageImage { ... Order = index });
```

---

## ═══════════════════════════════════════════
## SECTION 6 — HOW TO ANSWER HARD QUESTIONS
## (Turning "I don't know" into a confident answer)
## ═══════════════════════════════════════════

### Strategy 1 — Lead with what you DO know
If asked about something advanced (e.g., "Why didn't you implement CQRS?"):
> "In this project I focused on Clean Architecture with the Repository and Unit of Work patterns, which gave a good separation of concerns for the project scope. CQRS would be a natural next step for scaling the read/write load separately."

### Strategy 2 — Connect back to your code
Always bring the answer back to something real in your code. Don't give theoretical answers.
> "I can show you this exactly — in `BookingsController.GetById()`, line 41, I check `booking.UserId != GetUserId()` and return `403 Forbid()`. That's how I handle data ownership security."

### Strategy 3 — Acknowledge a weakness, explain what you'd do differently
If asked about something you know could be improved:
> "The current file upload endpoint in `UploadController` doesn't require authentication. I am aware of this and in production I would add `[Authorize]` and add file type/size validation to prevent misuse."

---

## ═══════════════════════════════════════════
## SECTION 7 — 20 REAL INTERVIEW Q&As
## ═══════════════════════════════════════════

---

**Q1: Explain your system architecture in 60 seconds.**
> "TravelEaseLK is a decoupled full-stack app. The frontend is Next.js — it handles the UI and makes HTTP calls to our ASP.NET Core REST API. The backend is built on Clean Architecture with 4 layers: Domain has our entities like `User`, `Package`, `Booking`. Application has our business logic services and interfaces. Infrastructure handles the database via EF Core and the Repository pattern. The API layer exposes REST endpoints through Controllers. All data is stored in SQL Server."

---

**Q2: What is Clean Architecture and why did you use it?**
> "Clean Architecture separates code by responsibility, not by technology. The Domain layer has zero dependencies. The Application layer depends only on Domain — it doesn't know if we use SQL Server or MongoDB. The Infrastructure layer implements those interfaces. This means I can swap the database with zero changes to business logic. It also makes unit testing possible — I can mock `IPackageService` in tests without touching the database."

---

**Q3: Explain the Repository Pattern with a real example from your code.**
> "`IRepository<T>` defines the interface: `GetAllAsync()`, `AddAsync()`, `DeleteAsync()` etc. `Repository<T>` in the Infrastructure layer implements it using EF Core. `PackageService` calls `_unitOfWork.Repository<Package>().GetAllAsync()` — it has no idea SQL Server is running underneath. If I switch to PostgreSQL, only `Repository<T>` changes. `PackageService` changes nothing."

---

**Q4: What is the Unit of Work pattern and where does it appear?**
> "Unit of Work ensures that multiple database changes are committed together or not at all. In `BookingService.CreateAsync()`, I update the package's available seats AND create the booking. I call `_unitOfWork.SaveChangesAsync()` ONCE at the end. If either operation fails, both are rolled back. Without Unit of Work, a crash between the two saves would leave the database in an inconsistent state."

---

**Q5: How does JWT authentication work in your system?**
> "When a user logs in, the backend's `AuthService` verifies the BCrypt-hashed password. If valid, `GenerateJwtToken()` creates a JWT containing Claims: the user's `Id`, `Email`, `Role`, and `Name`. The JWT is signed with a secret key from `appsettings.json`. The frontend stores this token and sends it in every request header as `Authorization: Bearer <token>`. The API validates the token signature on every request. If it's invalid or expired (7 days), a `401 Unauthorized` is returned."

---

**Q6: How do you prevent a Customer from seeing another Customer's booking?**
> "In `BookingsController.GetById()`, after fetching the booking I check two things: if the current user is an Admin, they can see anything. If they're a Customer, I compare `booking.UserId` with `GetUserId()`, which extracts the ID from the JWT token. If they don't match, I return `403 Forbid()`. The key insight is that `GetUserId()` reads from the server-side JWT — the client cannot forge it."

---

**Q7: What is Dependency Injection and why is it important?**
> "Instead of a class creating its own dependencies with `new PackageService()`, the dependency is injected via the constructor: `public PackagesController(IPackageService packageService)`. .NET's DI container handles wiring at runtime. This is important for testability — in a unit test, I can inject a `MockPackageService` without a real database. It also enables loose coupling — the controller depends on the `IPackageService` interface, not the concrete class."

---

**Q8: What is the difference between `abstract class` and `interface` in your code?**
> "`BaseEntity` is an abstract class because it has shared state and default values (`Id`, `CreatedAt = DateTime.UtcNow`). You can't instantiate it directly. `IRepository<T>` is an interface because it only defines the contract (method signatures) with no implementation. In C#, a class can inherit from only one abstract class but implement multiple interfaces. I use `BaseEntity` for shared entity data and interfaces for defining service contracts."

---

**Q9: What is Soft Delete and where do you use it?**
> "In `PackageService.DeleteAsync()`, instead of running `DELETE FROM Packages WHERE Id = x`, I set `package.IsActive = false`. The record stays in the database but all queries filter it: `.Where(p => p.IsActive)`. Benefits: data is never permanently lost, I can restore it, and I maintain a full audit trail. If a customer has a booking for a 'deleted' package, the booking record still has valid data."

---

**Q10: How does your Generic Repository work? What is `where T : BaseEntity`?**
> "`Repository<T>` is a Generic class. `T` is a placeholder for any type. `where T : BaseEntity` is a Generic Type Constraint — it means `T` must be a class that extends `BaseEntity`. This allows `context.Set<T>()` to work, which is EF Core's way of getting a `DbSet` for any entity. Without the constraint, EF Core wouldn't know the entity has an `Id`. With it, I get one `Repository` class that handles Users, Packages, Bookings, Blogs — all with the same code."

---

**Q11: What is `AsNoTracking()` and when do you use it?**
> "EF Core normally tracks every entity it loads in memory to detect changes for updates. For read-only queries — like fetching a list of packages for display — this tracking wastes memory and CPU. `AsNoTracking()` tells EF Core 'don't track this, we'll never update it'. I use it in every `GetAll` and `GetById` query in `PackageService` and `BookingService`. It makes queries significantly faster."

---

**Q12: Explain how pagination works in your API.**
> "In `PackagesController.GetAll()`, the client sends `page` and `pageSize` as query params. In `PackageService`, the query uses `.Skip((page - 1) * pageSize).Take(pageSize)`. For example, page 2 with pageSize 10 skips the first 10 and takes the next 10. The API also returns `total` count so the frontend can calculate total pages. This is server-side pagination — the database only returns the records needed, not all records."

---

**Q13: What is React Query and why is it better than `useEffect`?**
> "With `useEffect` and `fetch`, you manually manage loading states, error states, caching, and refetching — lots of boilerplate. React Query handles all of this. When the user visits `/packages`, React Query fetches `GET /api/packages`. If they navigate away and come back, it shows the cached data instantly while silently refetching in the background. If the network fails, it automatically retries. It greatly reduces code complexity."

---

**Q14: Why did you store services in a `Hashtable` in `UnitOfWork`?**
> "The `UnitOfWork` uses a `Hashtable` keyed by entity type name to cache Repository instances. The first time `Repository<Package>()` is called, it creates `new Repository<Package>(_context)` and stores it. The second call returns the cached instance. This ensures one shared `DbContext` is used for all repository operations within the same request, which is essential for transactions to work correctly."

---

**Q15: How does your blog visibility logic work for Admin vs public users?**
> "In `BlogsController.GetAll()`, I check if the requester is an Admin using `User.IsInRole(\"Admin\")`. If not Admin, I force `filterPublished = true`, so draft blogs are never returned. For `GetById()`, if the blog is a draft (`!blog.IsPublished`) and the user is not Admin, I return `403 Forbid()`. This means Admins can preview unpublished drafts, but regular users can never access them."

---

**Q16: What HTTP status codes do you use and when?**
| Code | When Used | Real Example |
|------|-----------|--------------|
| 200 OK | Success | Package fetched, Booking created |
| 400 Bad Request | Invalid input or business rule fail | "Not enough seats available" |
| 401 Unauthorized | No/invalid JWT token | Accessing `/api/bookings` without logging in |
| 403 Forbidden | Logged in but no permission | Customer accessing another's booking |
| 404 Not Found | Record doesn't exist | `Package not found` |

---

**Q17: How did you handle the relationship between Package and its images?**
> "`Package` has an `ICollection<PackageImage>` navigation property. `PackageImage` has a `PackageId` foreign key. This is a One-to-Many relationship (one Package has many Images). When creating, I use LINQ `Select` to map image URLs to `PackageImage` objects with an `Order` index. When updating, I delete all existing images and re-insert the new list — a clean replace strategy that avoids complex diff logic."

---

**Q18: What is the SOLID principle and where do you apply it?**
| Principle | Your Code |
|---|---|
| **S — Single Responsibility** | Controllers only handle HTTP. Services only handle business logic. Repositories only handle database. |
| **O — Open/Closed** | Adding a new entity (e.g., `Review`) doesn't change `Repository<T>`. Just create `IReviewService`. |
| **L — Liskov Substitution** | `Repository<Package>` can be used wherever `IRepository<Package>` is expected. |
| **I — Interface Segregation** | `IAuthService` only has auth methods. `IPackageService` only has package methods. |
| **D — Dependency Inversion** | Controllers depend on `IPackageService` (interface), not `PackageService` (concrete class). |

---

**Q19: What would you improve if you had more time?**
> "A few things: First, the `UploadController` has no authentication — I'd add `[Authorize]` and validate file types. Second, error handling is inconsistent — ideally a global Exception Middleware would catch all unhandled exceptions and return a standardized error response. Third, I'd add pagination metadata (current page, total pages) to all list responses. Finally, I'd add unit tests for the Service layer using xUnit and Moq."

---

**Q20: What was the hardest part of building this project?**
> "Setting up Clean Architecture correctly at the start was the hardest part. The dependency rules are strict — Application can't reference Infrastructure, Domain can't reference anything. Getting the dependency injection registrations in `Program.cs` right for all layers took time. But once it was set up, adding new features like `Blogs` and `Destinations` was very fast because the patterns were already established — I just followed the same structure."

---

*You now know this project better than anyone who didn't build it. Walk in confident.*

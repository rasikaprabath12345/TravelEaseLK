# OOP Concepts — Real World හරහා තේරුම් ගමු

> Code කලින් theory. Theory කලින් life. මේ file එකේ OOP concept ටික real world examples හරහා simple ලෙස explain කරලා, ඊට පස්සේ ඔයාගේ project code එකත් show කරනවා.

---

## 1. ENCAPSULATION — "රහස් ගේ ඇතුළෙම තියාගන්න"

### Real World Example
ATM machine එකක් ගන්න. ඔයා button press කරනවා, PIN දෙනවා, cash ගන්නවා.
ATM machine ඇතුළෙ **කොහොමද cash count කරන්නේ, කොහොමද bank connect වෙන්නේ** — ඒ ඔයාට **කවදාවත් පෙන්නනෙ නෑ, access දෙන්නෙ නෑ.**
ඒ details ඇතුළෙ hide කරලා, ඔයාට ඕන interface (buttons) විතරක් expose කරලා.

### ඔයාගේ Project Code
```csharp
// AuthService.cs
// කෙනෙකුට කෙළින්ම HashPassword() call කරන්න බෑ — private!
private string HashPassword(string password)
    => BCrypt.Net.BCrypt.HashPassword(password);

private bool VerifyPassword(string password, string hash)
    => BCrypt.Net.BCrypt.Verify(password, hash);

private string GenerateJwtToken(User user) { ... }
```
**Controller හෝ වෙන කිසි class** එකටත් `HashPassword()` call කරන්න බෑ. `AuthService` විතරක් ඇතුළෙ ඒ logic lock කරලා.

### Interview Answer
> "Encapsulation means hiding internal implementation. In my `AuthService`, password hashing and JWT generation are `private` methods. No other class can call them. This protects the security logic from accidental misuse."

---

## 2. ABSTRACTION — "Switch on කරන ක්‍රමය දන්නෙ නෑ, ඒත් light on වෙනවා"

### Real World Example
ඔයා car ගේ steering wheel හරහා car steer කරනවා. ඒත් **engine, gear box, hydraulics** ඇතුළෙ *කොහොමද wheels turn වෙන්නේ* — ඔයාට දන්නෙ නෑ, දන්නෙ ඕනත් නෑ.
Steering wheel = **Interface.** ඇතුළෙ engine = **Implementation.**

### ඔයාගේ Project Code
```csharp
// Application/Interfaces/IRepository.cs
public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    // ...
}
```
`PackageService` calls `_unitOfWork.Repository<Package>().GetAllAsync()`.

`PackageService` **නොදනී:**
- Database == SQL Server කියලා
- EF Core use කරනවා කියලා
- ඇතුළෙ `_dbSet.ToListAsync()` run වෙනවා කියලා

`PackageService` දන්නේ ඒකා: **"GetAllAsync() call කළොත් packages ලැබෙනවා."**

### Interview Answer
> "Abstraction means hiding HOW something works and showing only WHAT it does. `PackageService` calls `GetAllAsync()` through `IRepository<T>`. It has no knowledge of SQL Server or Entity Framework underneath. If we switch to a different database, `PackageService` changes zero lines."

---

## 3. INHERITANCE — "දරුවා ඈ/ඔහුගේ දෙමාපිය properties inherit කරගන්නවා"

### Real World Example
ඔබේ පියාට height 180cm, brown eyes. ඔබ ජීව්ය ලෙස ඒ traits inherit කරගත්තා.
ඔබ **ළමා කාලෙ ඉඳලා** height හා eyes rewrite කළේ නෑ — automatically ලැබුණා.
ඒ වගේම ඔබ unique properties add කළා (ඔයාගේ personality, skills).

### ඔයාගේ Project Code
```csharp
// Parent — BaseEntity.cs
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

// Child classes — automatically get Id, CreatedAt, UpdatedAt
public class User : BaseEntity
{
    // Id, CreatedAt, UpdatedAt — automatically ලැබුණා!
    public string FirstName { get; set; } = string.Empty;  // User-specific
    public string Email { get; set; } = string.Empty;      // User-specific
    public string PasswordHash { get; set; } = string.Empty;
}

public class Package : BaseEntity
{
    // Id, CreatedAt, UpdatedAt — automatically ලැබුණා!
    public string Name { get; set; } = string.Empty;  // Package-specific
    public decimal Price { get; set; }                // Package-specific
}

public class Booking : BaseEntity
{
    // Id, CreatedAt, UpdatedAt — automatically ලැබුණා!
    public string BookingId { get; set; } = string.Empty;  // Booking-specific
    public decimal TotalPrice { get; set; }                // Booking-specific
}
```
`Id`, `CreatedAt`, `UpdatedAt` 12 entities වලටම ලිව්වේ නෑ. `BaseEntity` inherited කළා.

**Controllers ද Inherit කරනවා:**
```csharp
public class PackagesController : ControllerBase
// ControllerBase ඉඳලා Ok(), NotFound(), BadRequest(), Forbid() ලැබෙනවා
```

### Interview Answer
> "Inheritance allows child classes to reuse parent class properties. All my entities (User, Package, Booking) inherit from `BaseEntity`, which gives them `Id`, `CreatedAt`, and `UpdatedAt` automatically. Without inheritance, I'd have to write those 3 properties in all 12 entity classes."

---

## 4. POLYMORPHISM — "එකම command, different reaction"

### Real World Example 1
"Hello" කියන word English කෙනෙකුට, Sinhala කෙනෙකුට, Japanese කෙනෙකුට කිව්වාම **response different.**
Same input → Different behaviour. That's polymorphism.

### Real World Example 2
Remote control එකේ "Volume Up" button press කළොත්:
- TV → volume up
- Speaker → volume up
- Radio → volume up

Same button (interface), different devices (implementations), different internal behaviour.

### ඔයාගේ Project Code

**Example 1 — Runtime Polymorphism (UnitOfWork)**
```csharp
// UnitOfWork.cs
public IRepository<T> Repository<T>() where T : BaseEntity
{
    var type = typeof(T).Name;
    if (!_repositories.ContainsKey(type))
    {
        var repositoryInstance = new Repository<T>(_context); // T changes at runtime!
        _repositories.Add(type, repositoryInstance);
    }
    return (IRepository<T>)_repositories[type]!;
}
```
`_unitOfWork.Repository<User>()` → `Repository<User>` return කරනවා
`_unitOfWork.Repository<Package>()` → `Repository<Package>` return කරනවා
`_unitOfWork.Repository<Booking>()` → `Repository<Booking>` return කරනවා

**Same method, different type at runtime.**

**Example 2 — Switch Polymorphism (PackageService sorting)**
```csharp
query = sortBy?.ToLower() switch
{
    "price_asc"  => query.OrderBy(p => p.Price),       // Different behaviour
    "price_desc" => query.OrderByDescending(p => p.Price),
    "rating"     => query.OrderByDescending(p => p.AverageRating),
    "newest"     => query.OrderByDescending(p => p.CreatedAt),
    _            => query.OrderByDescending(p => p.IsFeatured)
};
```
Same `query` variable, different sorting behaviour based on input.

### Interview Answer
> "Polymorphism means the same interface behaves differently based on context. In `UnitOfWork.Repository<T>()`, passing `T=User` returns a `Repository<User>`, but `T=Package` returns a `Repository<Package>`. Same method call, different concrete type at runtime. Also in `PackageService`, the same `query` variable sorts differently based on the `sortBy` parameter."

---

## 5. GENERICS — "One size fits all, but safely"

### Real World Example
Supermarket bag ගත්තෙ noodles දාලා use කරන්න. ඔයා vegetables, bottles, packets ඔක්කොම ඒ bag ඇතුළෙ දාන්නෙ. 
Bag = Generic container. ඇතුළෙ දාන product = T (Type parameter).
ඒත් bag nut drinkers, knives — **dangerous items** (wrong types) block කරනවා.

C# Generics: `where T : BaseEntity` = **dangerous types block** the constraint.

### ඔයාගේ Project Code
```csharp
// Without Generics — we'd need:
public class UserRepository { ... }     // 50 lines
public class PackageRepository { ... } // 50 lines  (SAME code!)
public class BookingRepository { ... } // 50 lines  (SAME code!)
public class BlogRepository { ... }    // 50 lines  (SAME code!)
// = 200 lines of duplicate code!

// With Generics — ONE class for everything:
public class Repository<T> : IRepository<T> where T : BaseEntity
{
    // 50 lines — handles User, Package, Booking, Blog, EVERYTHING
}
```

`where T : BaseEntity` = "Only our Domain entities allowed. No `string` or `int` passed as T."

### Interview Answer
> "Generics allow writing type-safe, reusable code. `Repository<T>` handles all entity types with one implementation. `where T : BaseEntity` is a constraint that ensures T must extend BaseEntity, so EF Core's `context.Set<T>()` can work. Without generics, I'd need a separate `UserRepository`, `PackageRepository` etc. — all with identical CRUD code."

---

## 6. ABSTRACT CLASS vs INTERFACE — "Blue print vs Contract"

### Real World Example

**Abstract Class** = Architect's blueprint for a building.
The blueprint says: "Every building MUST HAVE walls (abstract), windows (abstract), AND every building is positioned on a foundation at 0,0,0 coordinates (concrete property with default value)."
Buildings inherit the blueprint and must implement the abstract parts.

**Interface** = A contract / agreement.
A "Driver's License" contract says: "Whoever holds this must be able to `Drive()`, `Park()`, `StopAtRedLight()`."
It doesn't say HOW to drive. Anyone (Car driver, Bus driver, Truck driver) can hold this contract and implement driving their own way.

### ඔයාගේ Project Code

```csharp
// ABSTRACT CLASS — Has state (actual data) + abstract forces override
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  // Has default value!
    public DateTime? UpdatedAt { get; set; }
}
// User, Package, Booking INHERIT from this — get the actual values

// INTERFACE — Only a contract, NO state, NO implementation
public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(int id);  // No body! Just promise.
    Task<T> AddAsync(T entity);     // No body! Just promise.
    // ...
}
// Repository<T> IMPLEMENTS this — provides the actual code
```

| | Abstract Class (`BaseEntity`) | Interface (`IRepository<T>`) |
|---|---|---|
| Has actual data/values? | ✅ Yes (`CreatedAt = DateTime.UtcNow`) | ❌ No |
| Has method implementation? | Can have | ❌ No (only signatures) |
| A class can use... | Only 1 (single inheritance) | Multiple interfaces |
| Purpose | Share common state + enforce structure | Define a behaviour contract |

---

## 7. DESIGN PATTERNS — Real World Analogies

### Repository Pattern = "Library Librarian"
ඔයාට book ඕන. ඔයා ලිබ්‍රේරියන් ලාව ගිහිල්ලා කියනවා: "Harry Potter ගෙනත් දෙන්න." 
ඔයාට කිසිසේ දන්නෙ නෑ — රාක්ක B-17 section ඇතිද? ලේසර් search system ද? manual catalog ද?
Librarian = Repository. ඔයාට data ගෙනල් දෙනවා, database details hide.

### Unit of Work Pattern = "Shopping Cart Checkout"
Online shopping cart. ඔයා 5 items add කරනවා. "Pay" press කළාම ඒ 5 items ඔක්කොම process වෙනවා, ඔක්කොම fail වෙනවා.
ඔක්කොම save වෙනවා = `SaveChangesAsync()`
ඔක්කොම rollback = transaction fail

### Dependency Injection = "Restaurant Order"
ඔයා restaurant ගිහිල්ලා "Pizza" order කරනවා. ඔයා Pizza ගෙදන්නෙ කොහොමද (oven, ingredients) කිසිදෙයක් handle කරනෙ නෑ.
Restaurant (DI Container) = ඒ handle කරන entity.
Controller = customer. IPackageService = menu item. PackageService = actual pizza.

### Soft Delete = "Recycle Bin"
Windows Recycle Bin. File delete කරනවා — file **physically** hard drive ඉඳලා ගිහිල්ල නෑ. Recycle Bin folder ඇතුළෙ. Restore කරන්න පුළුවන්.
`IsActive = false` = Recycle Bin.
`Where(p => p.IsActive)` = normal view (recycle bin items show නෑ).

---

## 8. ROLE-BASED AUTHORIZATION — "Hotel Key Card System"

### Real World Example
Hotel key card system:
- **Guest card** → Opens only YOUR room (304). Not the gym at night. Not kitchen.  
- **Staff card** → Opens all guest rooms, gym, laundry.  
- **Manager card** → Opens everything including server room, safe.

Same building (API). Different access levels based on who you are (Role in JWT).

### ඔයාගේ Project

**JWT = Your Key Card.** Role embedded inside it.

```
Guest (Customer JWT) → Can: book packages, view own bookings, edit own profile
Staff/Manager (Admin JWT) → Can: manage packages, confirm bookings, view all users, access dashboard
```

```csharp
// "Manager card only" — entire DashboardController
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase { ... }

// "Everyone can browse, but only Manager can edit"
[HttpGet]                    // No card needed — public browsing
public async Task GetAll() { }

[Authorize(Roles = "Admin")] // Manager card required
[HttpPost]
public async Task Create() { }

// "You can only open YOUR room"
if (GetUserRole() != "Admin" && booking.UserId != GetUserId())
    return Forbid();  // 403 — "This is not your room!"
```

---

## QUICK CHEAT SHEET

| Concept | Simple Meaning | Your Code |
|---|---|---|
| **Encapsulation** | Lock your private stuff inside | `private HashPassword()` in AuthService |
| **Abstraction** | Steering wheel, not engine | `IRepository<T>` hides EF Core |
| **Inheritance** | Child gets parent traits | `User : BaseEntity` gets Id, CreatedAt |
| **Polymorphism** | Same command, different reaction | `Repository<T>()` returns different type per T |
| **Generics** | One size fits all (safely) | `Repository<T>` works for all entities |
| **Abstract Class** | Blueprint with some defaults | `BaseEntity` has `CreatedAt = DateTime.UtcNow` |
| **Interface** | Contract, no implementation | `IRepository<T>` — only method signatures |
| **Repository Pattern** | Librarian fetches your data | `IRepository<T>` hides database |
| **Unit of Work** | Shopping cart checkout | `SaveChangesAsync()` commits all at once |
| **Dependency Injection** | Restaurant brings your order | .NET injects `PackageService` to controller |
| **Soft Delete** | Recycle Bin | `IsActive = false` instead of DELETE |
| **Role-Based Auth** | Hotel key card | `[Authorize(Roles = "Admin")]` |

---

*Interview tip: Concept explain කරන්නනම් — real world analogy කියන්න, ඊළඟට ඔයාගේ code ඉඳලා specific example දෙන්න. Interviewer impressed!*

---
---

## 9. ASYNC / AWAIT — "Order දීලා ඉන්ද, ඒ අතරෙ වෙන වැඩ කරන්න"

### Real World Example
ඔයා restaurant ගිහිල්ලා pizza order කළා. Waiter ගිහිල්ලා kitchen ලාව pizza හදන්නෙ.
ඔයා pizza එනකන් **ඉඳන් බලාගෙන ඉන්නෙ නෑ (blocking නෑ)** — phone check කරනවා, friend ගෙ කතාව අහනවා.
Pizza ready වෙලා Waiter ආවාම (callback) ඔයා බොන්නෙ.

**Synchronous (blocking)** = Pizza හදනකන් ඔයා ඉඳගෙන freeze. වෙන කිසිදෙයක් කරන්නෙ නෑ.
**Asynchronous (non-blocking)** = Pizza order දීලා ඔයා free. Pizza ready වෙලාම notify.

### ඔයාගේ Project Code
```csharp
// Every database call is async — thread is never blocked waiting
public async Task<PackageDto?> GetByIdAsync(int id)
{
    // await = "wait for DB response, but don't block the thread"
    var package = await _unitOfWork.Repository<Package>().GetByIdAsync(id);
    return package;
}
```

### Why it matters for APIs
ඔයාගේ API ට 100 users same time request කළොත්:
- **Sync:** User 1 database query run වෙනකන් User 2-100 ලා wait.
- **Async:** Database query run වෙන ගමන් thread free — User 2, 3, 4... process කරනවා.

### Interview Answer
> "Database calls are I/O-bound — the CPU just waits for SQL Server to respond. With async/await, the thread is released back to the thread pool while waiting. This allows the API to handle hundreds of concurrent requests with far fewer threads."

---

## 10. LINQ & LAMBDA EXPRESSIONS — "List ඇතුළෙ search / filter"

### Real World Example — LINQ
ඔයා supermarket ගිහිල්ලා: "Rs 500 ට අඩු, Milo brand, sugar-free items ගෙනත් දෙන්න."
LINQ = **supermarket search query**. Database ලාව ඒ ශෙල්ෆ් ඔක්කොම search නොකර, filter කරලා ඕන record ගෙනල් දෙනවා.

### Real World Example — Lambda
Lambda = **Short instruction / Anonymous function**
"Rs 500 ට අඩු" = `p => p.Price < 500` (p-ට price 500 ට අඩු නම් true)
Arrow (`=>`) = "given this input, do/return this"

### ඔයාගේ Project Code
```csharp
// PackageService.cs — LINQ with Lambda chaining
var query = _unitOfWork.Repository<Package>().Query()
    .Where(p => p.IsActive)                              // Filter: active only
    .Where(p => p.Name.Contains(search))                 // Filter: search text
    .Where(p => p.Price >= minPrice)                     // Filter: min price
    .OrderByDescending(p => p.AverageRating)             // Sort: by rating
    .Skip((page - 1) * pageSize)                         // Pagination: skip pages
    .Take(pageSize)                                       // Pagination: take N
    .Select(p => new PackageDto { Name = p.Name, ... }); // Project to DTO
```

```csharp
// AuthService.cs — Lambda in FindAsync
var users = await _unitOfWork.Repository<User>()
    .FindAsync(u => u.Email == dto.Email && u.IsActive);
// u => u.Email == dto.Email   means: "for each user u, check if email matches"
```

EF Core = **ඒ LINQ code SQL ලෙස translate කරලා database ලාව යවනවා:**
`WHERE IsActive = 1 AND Name LIKE '%beach%' ORDER BY AverageRating DESC`

### Interview Answer
> "LINQ (Language Integrated Query) lets me write type-safe queries in C# instead of raw SQL. Lambda expressions like `p => p.Price >= minPrice` are anonymous functions passed inline. EF Core translates these LINQ queries into optimized SQL at runtime."

---

## 11. EXCEPTION HANDLING — "Plan B, Plan C"

### Real World Example
ඔයා ATM ගිහිල්ලා cash ගන්නෙ:
- **Normal flow:** Card insert → PIN → cash out ✅
- **Exception 1:** Wrong PIN → "Incorrect PIN" message (ගෙදර නොගොස් error show)
- **Exception 2:** No cash in machine → "Insufficient funds in machine"
- **Exception 3:** Network down → "Service unavailable, try later"

ATM **crash** වෙලා වැටෙනෙ නෑ — exception handle කරලා user-friendly message show කරනවා.

### ඔයාගේ Project Code
```csharp
// AuthController.cs
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDto dto)
{
    try
    {
        var result = await _authService.LoginAsync(dto);
        return Ok(new { success = true, data = result }); // Happy path
    }
    catch (Exception ex)
    {
        // API never crashes — returns clean error response
        return Unauthorized(new { success = false, message = "Invalid email or password" });
    }
}
```

```csharp
// BookingService.cs — throw Exception as business rule violation
var package = await _unitOfWork.Repository<Package>().GetByIdAsync(dto.PackageId)
    ?? throw new Exception("Package not found"); // Caught by controller's catch block

if (totalGuests > package.AvailableSeats)
    throw new Exception("Not enough seats available"); // Business rule failure
```

**Flow:** Service throws → Controller catches → Returns proper HTTP status (`400`, `401`, `404`).

### Interview Answer
> "I use try-catch in controllers to handle exceptions thrown by services. Services throw exceptions for business rule violations like 'Not enough seats available'. The controller catches it and returns a proper HTTP 400 Bad Request with a user-friendly message, instead of crashing the API."

---

## 12. WHAT IS A REST API? — "Waiter between Kitchen & Customer"

### Real World Example
Restaurant:
- **Customer (Frontend)** = You sitting at the table
- **Waiter (REST API)** = Takes your order, brings food
- **Kitchen (Database)** = Where food is prepared

You never go to the kitchen directly. You speak to the waiter using a **menu (HTTP methods):**
- `GET` = "Bring me the menu / a dish" (Read)
- `POST` = "I want to order this" (Create)
- `PUT` = "Change my order" (Update)
- `DELETE` = "Cancel my order" (Delete)

Waiter responds with a plate of food (JSON data) or "Sorry, dish not available" (404).

### ඔයාගේ Project
```
GET    /api/packages         → All packages (menu)
GET    /api/packages/5       → Package with Id 5
POST   /api/packages         → Create new package (Admin only)
PUT    /api/packages         → Update package (Admin only)
DELETE /api/packages/5       → Delete package (Admin only)
POST   /api/auth/login       → Login (get JWT token)
POST   /api/bookings         → Create booking
GET    /api/dashboard/stats  → Admin stats (Admin only)
```

### Interview Answer
> "REST API is a standard way for the frontend and backend to communicate over HTTP. Each resource (packages, bookings, users) has its own URL endpoint. We use GET to retrieve data, POST to create, PUT to update, and DELETE to remove. The API always responds with JSON and a standard HTTP status code."

---

## 13. NULL SAFETY OPERATORS — `?.` and `??`

### Real World Example
ඔයා කෙනෙකුගෙ address find කරන්නෙ:
- "Person 5 → ගේ → Street → City → Country"
- Person 5 **exist නොකරේ** නම් — crash වෙනෙ නෑ, null return.

`?.` = "Exists නම් next step. නොමැතිනම් null return."
`??` = "Null නම් default value use කරන්න."

### ඔයාගේ Project Code
```csharp
// BookingService.cs
PackageName = b.Package != null ? b.Package.Name : "",
// Simplified with ?. and ??:
PackageName = b.Package?.Name ?? "",
// If Package is null → "" (empty string), not a crash

// BookingsController.cs
private int GetUserId()
    => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
// FindFirst() might return null → ?.Value returns null → ?? "0" as default

// PackageService.cs
var package = await _unitOfWork.Repository<Package>().GetByIdAsync(dto.Id)
    ?? throw new Exception("Package not found");
// If GetById returns null → throw exception immediately
```

### Interview Answer
> "The `?.` operator is the null-conditional operator — it returns null instead of throwing a NullReferenceException if the left side is null. The `??` operator is the null-coalescing operator — it provides a default value if the left side is null. Together they make code safer and cleaner."

---

## 14. SOLID PRINCIPLES — Simple Version

| Letter | Principle | Simple Meaning | Your Code |
|---|---|---|---|
| **S** | Single Responsibility | One class = One job | Controller = HTTP only. Service = Logic only. Repository = DB only. |
| **O** | Open/Closed | Add features without changing existing code | Add `BlogService` without touching `PackageService` |
| **L** | Liskov Substitution | Child can replace parent safely | `Repository<Package>` can be used wherever `IRepository<Package>` is expected |
| **I** | Interface Segregation | Small focused interfaces | `IAuthService` only has auth. `IPackageService` only has package methods. |
| **D** | Dependency Inversion | Depend on interfaces, not concrete classes | Controller depends on `IPackageService`, not `PackageService` |

### Real World Analogy for **S (Single Responsibility)**
Hospital:
- Doctor = diagnoses (one job)
- Nurse = administers medication (one job)
- Receptionist = books appointments (one job)

If the doctor also does receptionist work AND nurses' work — chaos.

### Real World Analogy for **D (Dependency Inversion)**
Power outlet. Your laptop, phone, fan — all plug into the same outlet **interface** (3-pin standard).
The outlet doesn't care which device — it depends on the **interface** (3-pin), not the specific device.

---

## 15. IDisposable PATTERN — "Clean up after yourself"

### Real World Example
ऑफिसे meeting room book කළා. Meeting ඉවර වූ පස්සේ — light off, whiteboard clean, door lock. **Resources release.**
`IDisposable.Dispose()` = Meeting room cleanup.

### ඔයාගේ Project Code
```csharp
// UnitOfWork.cs implements IDisposable
public class UnitOfWork : IUnitOfWork // IUnitOfWork : IDisposable
{
    public void Dispose()
    {
        _context.Dispose(); // Release DB connection back to pool
    }
}
```
.NET's DI container automatically calls `Dispose()` at the end of each HTTP request, releasing the database connection. Without this, connections would pile up and the server would run out of database connections.

### Interview Answer
> "My `UnitOfWork` implements `IDisposable` because it holds a `DbContext`, which holds a database connection. When the HTTP request ends, .NET's DI container automatically calls `Dispose()`, releasing the connection back to the connection pool. This prevents connection leaks."

---

## UPDATED QUICK CHEAT SHEET

| Concept | Simple Meaning | Your Code |
|---|---|---|
| **Encapsulation** | Lock private stuff inside | `private HashPassword()` in AuthService |
| **Abstraction** | Steering wheel not engine | `IRepository<T>` hides EF Core |
| **Inheritance** | Child gets parent traits | `User : BaseEntity` gets Id, CreatedAt |
| **Polymorphism** | Same command, different reaction | `Repository<T>()` returns different type per T |
| **Generics** | One size fits all safely | `Repository<T>` works for all entities |
| **Abstract vs Interface** | Blueprint vs Contract | `BaseEntity` vs `IRepository<T>` |
| **Repository Pattern** | Librarian fetches data | `IRepository<T>` hides database |
| **Unit of Work** | Shopping cart checkout | `SaveChangesAsync()` commits all at once |
| **Dependency Injection** | Restaurant brings order | .NET injects `PackageService` to controller |
| **Soft Delete** | Recycle Bin | `IsActive = false` instead of DELETE |
| **Role-Based Auth** | Hotel key card | `[Authorize(Roles = "Admin")]` |
| **async/await** | Order, do other things, eat when ready | All DB calls are `async Task<>` |
| **LINQ + Lambda** | Supermarket filter query | `.Where(p => p.Price >= min)` |
| **Exception Handling** | Plan B when things go wrong | try-catch in all controllers |
| **REST API** | Waiter between kitchen & customer | GET/POST/PUT/DELETE endpoints |
| **`?.` and `??`** | Safe navigation + default value | `b.Package?.Name ?? ""` |
| **SOLID** | 5 principles of clean design | S=One job, D=Depend on interfaces |
| **IDisposable** | Clean up resources after use | `_context.Dispose()` in UnitOfWork |

---

*Interview tip: Concept explain කරන්නනම් — real world analogy කියන්න, ඊළඟට ඔයාගේ code ඉඳලා specific example දෙන්න. Interviewer impressed!*


# TravelEaseLK — INTERN INTERVIEW FULL TRAINING GUIDE
### Sri Lankan Software Company Campus Interview Style

> **ඔයාට කිව යුතු දෙයක්:**
> ඔයා මේ project එක හදලා තිබෙනවා. Code ලිව්වා. Deploy කළා. ඒ experience real. ඔයා දන්නෙ නැති දෙයකදීත් — ඒ project ඉඳලා back කරගන්න. "I built this, and here's what I learned" කිව්ව කෙනෙකු, theory කියන කෙනෙකුට වඩා impressive. Read this guide. Practice out loud. Walk in confident.

---

## ═══════════════════════════════════════════
## PART 1 — INTERVIEW ROOM ඇතුළෙ වෙන දේ
## (Sri Lankan Campus Interview Format)
## ═══════════════════════════════════════════

### Typical Structure (60-90 min)
```
1. Introduction & Self-intro (5-10 min)
2. Project Walk-through — "Tell me about your project" (15-20 min)
3. Technical Questions — OOP, Design Patterns (20-30 min)
4. Practical/Coding Questions — Live or on paper (15-20 min)
5. SQL Questions (10-15 min)
6. Frontend / React Questions (5-10 min)
7. Behavioral Questions (5-10 min)
8. "Any questions for us?" (5 min)
```

---

## ═══════════════════════════════════════════
## PART 2 — SELF INTRODUCTION (60 seconds)
## ═══════════════════════════════════════════

> **Practice this out loud 10 times before the interview.**

**Template to memorize:**
> "Hi, I'm [Name]. I'm currently studying [Degree] at [University]. For my internship application, I've built TravelEaseLK — a full-stack travel booking platform. The backend is built with ASP.NET Core following Clean Architecture, using Entity Framework Core with SQL Server. The frontend is Next.js with TypeScript, Tailwind CSS, and React Query for data fetching. The system includes user authentication with JWT, role-based access for admins and customers, a booking system with real-time seat inventory management, and an admin dashboard. I built this project from scratch, which gave me hands-on experience with the full development cycle — from database design to REST API design to frontend state management."

---

## ═══════════════════════════════════════════
## PART 3 — PROJECT WALK-THROUGH QUESTIONS
## (Interviewers always start here)
## ═══════════════════════════════════════════

---

**Q: "Tell me about your project. What does it do?"**

> "TravelEaseLK is a full-stack travel booking platform for Sri Lanka. Customers can browse tour packages, view destinations, read travel blogs, and make bookings. There's a customer dashboard where they can track their bookings and upload payment receipts. There's also an admin panel for managing packages, confirming bookings, publishing blogs, and viewing analytics. The system enforces role-based access — Admins and Customers have different permissions."

---

**Q: "Walk me through the architecture of your system."**

> "The system is decoupled. The frontend is a Next.js application running on port 3000. It communicates with the backend via HTTP REST API calls using Axios. The backend is ASP.NET Core running on port 5000, built on Clean Architecture with 4 layers: Domain, Application, Infrastructure, and API. The Domain layer has pure entity classes with no dependencies. The Application layer has all the business logic services. The Infrastructure layer handles database operations using Entity Framework Core. The API layer has the Controllers that expose REST endpoints. Data is stored in SQL Server."

---

**Q: "Why did you choose these specific technologies?"**

> "For the backend, I chose ASP.NET Core with C# because it's strongly typed — TypeScript on the frontend and C# on the backend means type errors are caught at compile time, not runtime. I chose Next.js because it supports Server-Side Rendering which improves SEO — important for a travel platform where users might Google 'Sri Lanka tour packages'. For state management, I used Zustand for global client state (lightweight, no boilerplate) and React Query for server state, which handles caching automatically. SQL Server with Entity Framework Core lets me write type-safe queries in C# without raw SQL."

---

**Q: "What was the hardest technical challenge you faced?"**

> "Setting up Clean Architecture correctly. The dependency rules are very strict — the Application layer cannot reference Infrastructure, and Domain cannot reference anything. Getting the dependency injection registrations in Program.cs correct for all four layers took significant debugging. But once set up, adding new features was very fast — I'd add a Domain entity, create a DTO, write a Service, implement the interface, and add a Controller. The pattern was consistent and the code stayed clean throughout."

---

**Q: "If you had 2 more weeks, what would you add or improve?"**

> "Three things: First, the file upload endpoint has no authentication — I'd add `[Authorize]` and validate file types and sizes. Second, I'd add a global exception middleware to standardize error responses across all controllers instead of try-catch in each one. Third, I'd add unit tests for the Service layer using xUnit and Moq, testing the business logic in isolation."

---

## ═══════════════════════════════════════════
## PART 4 — OOP QUESTIONS & ANSWERS
## (Most common intern interview topic)
## ═══════════════════════════════════════════

---

**Q: "What are the 4 pillars of OOP? Give me an example from your project for each."**

> **Encapsulation:** Restricting direct access to data. In my `AuthService`, `HashPassword()` and `GenerateJwtToken()` are `private` methods. No other class can call them directly — only `AuthService` can hash passwords.

> **Abstraction:** Hiding implementation details. `IRepository<T>` is an interface. `PackageService` calls `GetAllAsync()` without knowing it uses EF Core and SQL Server underneath. The implementation detail is hidden.

> **Inheritance:** Child classes reuse parent properties. All my entities — `User`, `Package`, `Booking` — inherit from `BaseEntity`, which gives them `Id`, `CreatedAt`, and `UpdatedAt` automatically. My controllers inherit from `ControllerBase`, giving them `Ok()`, `NotFound()`, `BadRequest()` methods.

> **Polymorphism:** Same interface, different behaviour. `UnitOfWork.Repository<T>()` — when called with `T=User` it returns `Repository<User>`, when called with `T=Package` it returns `Repository<Package>`. Same method call, different concrete type at runtime.

---

**Q: "What is the difference between an interface and an abstract class?"**

> "An interface defines a contract — only method signatures, no implementation, no state. A class can implement multiple interfaces. An abstract class can have both abstract methods (no implementation) and concrete methods (with implementation), and can have fields with state. A class can inherit from only one abstract class.

> In my project, `BaseEntity` is an abstract class because it has actual shared data: `Id`, `CreatedAt = DateTime.UtcNow`. Every entity needs this data automatically. `IRepository<T>` is an interface because it only defines what operations exist — `GetAllAsync()`, `AddAsync()` etc. — without saying how they're implemented."

---

**Q: "What is the difference between Overloading and Overriding?"**

> "**Overloading** is when you have multiple methods with the same name but different parameters in the same class. For example, `Register(string email)` and `Register(string email, string phone)`. It's resolved at compile time.

> **Overriding** is when a child class provides a different implementation of a method defined in a parent class, using the `override` keyword. It's resolved at runtime.

> In my project, when `Repository<T>` implements `IRepository<T>`, it overrides the interface's method signatures with concrete implementations."

---

**Q: "What is a constructor? How is it used in your code?"**

> "A constructor is a special method that runs when an object is created. In my project, I use constructor injection for Dependency Injection. For example:
```csharp
public PackagesController(IPackageService packageService)
{
    _packageService = packageService;
}
```
When .NET creates `PackagesController`, it automatically calls this constructor and injects the `IPackageService` implementation. This is how all my services and repositories are wired together."

---

**Q: "What is the 'single responsibility principle'?"**

> "A class should have only one reason to change — one job. In my project: Controllers handle only HTTP (reading request, returning response). Services handle only business logic (seat validation, price calculation). Repositories handle only database CRUD. If I need to change how packages are fetched from the database, only the Repository changes. If I need to change the price calculation formula, only the Service changes."

---

**Q: "What are Access Modifiers?"**

> "They control who can access a class member:
> - `public` — anyone can access. My API endpoints, DTOs.
> - `private` — only within the same class. My `HashPassword()`, `GenerateJwtToken()` in AuthService.
> - `protected` — same class and child classes. `_context` and `_dbSet` in Repository are `protected` so child repositories could access them.
> - `internal` — only within the same assembly/project."

---

**Q: "What is a static class or method?"**

> "A static class cannot be instantiated — you call its methods directly on the class name, not on an object. A static method belongs to the class, not to an instance. For example, utility methods like `DateTime.UtcNow` or `Guid.NewGuid()` — I use these in my project without creating a `DateTime` or `Guid` object first."

---

## ═══════════════════════════════════════════
## PART 5 — DESIGN PATTERN QUESTIONS
## ═══════════════════════════════════════════

---

**Q: "What design patterns did you use?"**

> "I used four main patterns:

> **Repository Pattern** — Abstracts database access behind `IRepository<T>`. Services never touch the database directly; they go through the repository interface.

> **Unit of Work Pattern** — `IUnitOfWork` manages all repositories and provides a single `SaveChangesAsync()` method. This ensures multiple database operations commit atomically.

> **Dependency Injection** — All dependencies are injected via constructors, registered in `Program.cs`. This decouples classes and makes testing possible.

> **Soft Delete Pattern** — Instead of deleting records, I set `IsActive = false`. Data is preserved, recoverable, and auditable."

---

**Q: "What is Dependency Injection and why is it important?"**

> "Dependency Injection means a class receives its dependencies from the outside rather than creating them internally. Instead of `var service = new PackageService()`, the DI container creates and injects it:
```csharp
public PackagesController(IPackageService packageService)
{
    _packageService = packageService;
}
```
Registered in Program.cs: `builder.Services.AddScoped<IPackageService, PackageService>();`

> Importance: 1) Testability — I can inject a mock `IPackageService` in tests without a real database. 2) Loose coupling — controller depends on the interface, not the concrete class. 3) Lifetime management — .NET handles `Scoped` (per-request), `Singleton` (once), `Transient` (each time)."

---

**Q: "What is the difference between Scoped, Singleton, and Transient in DI?"**

> "These are service lifetimes in .NET's DI container:
> - **Singleton** — One instance for the entire application lifetime. Used for stateless, shared services like configuration readers.
> - **Scoped** — One instance per HTTP request. My `IUnitOfWork` and `DbContext` are scoped — all repositories within one request share the same DbContext, so transactions work correctly.
> - **Transient** — A new instance every time it's requested. Used for lightweight, stateless services."

---

## ═══════════════════════════════════════════
## PART 6 — SQL QUESTIONS
## ═══════════════════════════════════════════

---

**Q: "Explain your database schema."**

> "I have a relational SQL Server database. The core tables are:
> - `Users` — Id, FirstName, LastName, Email, PasswordHash, Role (Customer/Admin), IsActive
> - `Packages` — Id, Name, Price, Duration, AvailableSeats, DestinationId, IsActive
> - `Destinations` — Id, Name, Description, Country
> - `Bookings` — Id, BookingId, UserId (FK), PackageId (FK), TravelDate, TotalPrice, Status
> - `Blogs` — Id, Title, Content, IsPublished

> `Bookings` is the junction table resolving the Many-to-Many between Users and Packages. One user can make many bookings, one package can have many bookings."

---

**Q: "What is the difference between Primary Key and Foreign Key?"**

> "A **Primary Key** uniquely identifies each row in a table. `Users.Id` is the primary key — no two users can have the same Id. It cannot be null.

> A **Foreign Key** is a column in one table that references the Primary Key of another table, creating a relationship. `Bookings.UserId` is a foreign key referencing `Users.Id`. This means you cannot create a Booking for a UserId that doesn't exist in the Users table — the database enforces referential integrity."

---

**Q: "What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN?"**

> "Given `Packages` and `Bookings`:
> - **INNER JOIN** — Returns only rows where there's a match in BOTH tables. Only packages that have bookings.
> - **LEFT JOIN** — Returns ALL rows from the left table (Packages), and matching rows from Bookings. Packages with no bookings also appear (with NULL booking columns).
> - **RIGHT JOIN** — All rows from the right table (Bookings), matching from left. Rarely used in practice.

> In EF Core, when I call `.Include(b => b.Package)` in `BookingService`, it performs a LEFT JOIN to load the related package data alongside the booking."

---

**Q: "What is the difference between WHERE and HAVING?"**

> "**WHERE** filters rows BEFORE grouping. It works on individual rows.
> **HAVING** filters AFTER GROUP BY — it filters groups.

> Example: Find destinations with more than 5 confirmed bookings:
```sql
SELECT DestinationId, COUNT(*) as BookingCount
FROM Bookings
WHERE Status = 'Confirmed'      -- Filters rows first
GROUP BY DestinationId
HAVING COUNT(*) > 5             -- Then filters groups
```"

---

**Q: "What is an Index in SQL? When would you use one?"**

> "An index is a data structure that speeds up data retrieval at the cost of extra storage and slower writes. Like a book's index — instead of reading every page, you jump directly.

> In my project, `Users.Email` would benefit from an index because every login query does `WHERE Email = ?`. Without an index, SQL Server scans every row. With an index, it jumps directly to the matching row. I'd add it with EF Core's `HasIndex(u => u.Email).IsUnique()` in the DbContext configuration."

---

**Q: "What is a Transaction in SQL?"**

> "A transaction is a group of operations that either ALL succeed or ALL fail — atomicity. In my `BookingService.CreateAsync()`, I do two things: deduct `Package.AvailableSeats` and create the `Booking`. Both are staged as changes. When `_unitOfWork.SaveChangesAsync()` is called, EF Core wraps both in a SQL transaction. If the INSERT into Bookings fails, the UPDATE to Package seats is also rolled back. The database stays consistent."

---

**Q: "What is normalization? What is 1NF, 2NF, 3NF?"**

> "Normalization is organizing a database to reduce data redundancy and improve integrity.
> - **1NF** — Each column has atomic (single) values. No repeating groups.
> - **2NF** — 1NF + every non-key column fully depends on the entire primary key (no partial dependency). Relevant when there's a composite key.
> - **3NF** — 2NF + no transitive dependencies. Non-key columns depend only on the primary key, not on other non-key columns.

> My Bookings table: `PackageName` is NOT stored in Bookings — it would be a transitive dependency (BookingId → PackageId → PackageName). Instead, I store only `PackageId` and JOIN to get the name. That's 3NF."

---

**Q: "What is the difference between DELETE, TRUNCATE, and DROP?"**

> "- **DELETE** — Removes specific rows with WHERE clause. Logged (can rollback). Triggers fire. `DELETE FROM Bookings WHERE Status = 'Cancelled'`
> - **TRUNCATE** — Removes ALL rows fast. Minimal logging. Cannot use WHERE. Resets identity counters. Faster than DELETE for clearing a table.
> - **DROP** — Removes the entire TABLE structure and data. Cannot be undone easily.

> In my project, I use Soft Delete (`IsActive = false`) instead of DELETE for packages — so I never actually delete booking-related data."

---

## ═══════════════════════════════════════════
## PART 7 — BACKEND / C# / .NET QUESTIONS
## ═══════════════════════════════════════════

---

**Q: "What is Entity Framework Core? How does it work?"**

> "Entity Framework Core is an ORM — Object-Relational Mapper. It lets me write database queries in C# instead of SQL. I define C# classes (entities), and EF Core creates and manages the database tables. When I call `_dbSet.Where(p => p.IsActive).ToListAsync()`, EF Core translates this LINQ into SQL: `SELECT * FROM Packages WHERE IsActive = 1`, sends it to SQL Server, and maps the result rows back to `Package` C# objects."

---

**Q: "What is the difference between Code-First and Database-First in EF Core?"**

> "**Code-First** — I write C# entity classes first, then EF Core generates the database schema via Migrations. I used Code-First in this project. I define `Package.cs`, run `dotnet ef migrations add`, and EF creates the `Packages` table.

> **Database-First** — The database already exists, and EF Core generates C# entity classes by reverse-engineering the database schema. Used when working with existing legacy databases."

---

**Q: "What is a Migration in EF Core?"**

> "A Migration is a version-controlled snapshot of database schema changes. When I add a new property to an entity (like adding `AverageRating` to Package), I run `dotnet ef migrations add AddAverageRating`. EF Core generates a migration file with the SQL to add the column. Running `dotnet ef database update` applies it to the actual database. This lets the team track and apply schema changes incrementally, like git for the database."

---

**Q: "What is the difference between `Task`, `Task<T>`, and `void` in async methods?"**

> "`void` — fire and forget, no return value, no way to await. Generally avoided in async code.
> `Task` — represents an async operation with no return value. `await` can wait for it.
> `Task<T>` — represents an async operation that returns a value of type T. `await` unwraps the value.

> In my code, `Task<BookingDto>` means the method is asynchronous and will eventually return a `BookingDto` object."

---

**Q: "What is the `??` operator and `?.` operator in C#?"**

> "`?.` is the null-conditional operator. `b.Package?.Name` — if `Package` is null, returns null instead of throwing `NullReferenceException`.

> `??` is null-coalescing. `b.Package?.Name ?? \"\"` — if the left side is null, use the right side as default.

> Example from my code: `User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? \"0\"` — if FindFirst returns null (no claim found), `.Value` would crash. The `?.` makes it return null safely, and `?? \"0\"` provides a fallback."

---

**Q: "What is JWT? How does it work?"**

> "JWT — JSON Web Token — is a compact, self-contained way to transmit information securely between parties. It has three parts separated by dots: `header.payload.signature`.

> **Header** — algorithm used (HmacSha256).
> **Payload** — Claims: UserId, Email, Role, expiry.
> **Signature** — Header + Payload encrypted with a secret key. Tampering with payload invalidates the signature.

> In my system: Login → Server generates JWT with UserId and Role as claims → Client stores token → Client sends token in every request header → Server validates signature → If valid, extracts UserId and Role from claims. The token expires in 7 days."

---

**Q: "What is BCrypt? Why not just hash passwords with MD5?"**

> "BCrypt is a password hashing function designed to be slow. MD5 and SHA are general-purpose hash functions designed to be FAST — bad for passwords.

> BCrypt includes a **salt** (random data added before hashing) which prevents rainbow table attacks. BCrypt also has a **work factor** — you can make it computationally more expensive over time as hardware gets faster. `BCrypt.HashPassword(password)` automatically generates a unique salt and embeds it in the hash. `BCrypt.Verify(input, hash)` extracts the salt from the stored hash and re-hashes the input to compare."

---

## ═══════════════════════════════════════════
## PART 8 — FRONTEND / REACT / NEXT.JS QUESTIONS
## ═══════════════════════════════════════════

---

**Q: "What is the difference between React and Next.js?"**

> "React is a UI library for building component-based interfaces. It runs entirely in the browser (Client-Side Rendering). The browser downloads an almost empty HTML file and JavaScript, then builds the page.

> Next.js is a framework built on top of React that adds Server-Side Rendering (SSR) and Static Site Generation (SSG). With SSR, the server pre-renders the HTML before sending it to the browser — pages load faster and search engines can index the content. For a travel platform where SEO matters (people searching 'Sri Lanka beach tours'), SSR is very beneficial."

---

**Q: "What is the difference between useState and useEffect?"**

> "`useState` manages local component state — data that, when changed, causes the component to re-render. Example: `const [count, setCount] = useState(0)`.

> `useEffect` runs side effects after rendering — data fetching, DOM manipulation, subscriptions. Example: Fetching packages when the component mounts.

> In my project, I replaced most manual `useEffect` + `fetch` patterns with **React Query**, which abstracts this away with built-in caching, loading states, and error states."

---

**Q: "What is React Query and why did you use it instead of useEffect?"**

> "React Query is a server state management library. It handles data fetching, caching, background refetching, and loading/error states automatically.

> With `useEffect` + `fetch`, I'd need to manually write: loading state, error state, retry logic, cache invalidation. That's 30+ lines per API call.

> With React Query: `const { data, isLoading, error } = useQuery(['packages'], fetchPackages)`. 3 lines. If the user navigates away and comes back, cached data shows instantly while React Query silently refetches in the background."

---

**Q: "What is Zustand and how does it differ from Redux?"**

> "Both are global state management solutions. Redux requires: actions, reducers, action creators, middleware — lots of boilerplate. Zustand is much simpler — you define a store with state and actions in one place, and components subscribe to what they need.

> I use Zustand to store the logged-in user's session (token, name, role) globally. When a user logs in, Zustand updates the store, and all components (Navbar, Dashboard) automatically re-render with the new user state."

---

**Q: "What is TypeScript and why use it over JavaScript?"**

> "TypeScript is a superset of JavaScript that adds static typing. When I define a `PackageDto` type and my API returns data, TypeScript ensures I'm accessing the correct fields. If I typo `package.nme` instead of `package.name`, TypeScript catches it at compile time — not at runtime in production.

> Also, with TypeScript, IDEs give better autocomplete. Since my backend uses C# (strongly typed) and my frontend uses TypeScript, the data shapes (DTOs) can be mirrored between layers, reducing mismatch bugs."

---

## ═══════════════════════════════════════════
## PART 9 — LIVE CODING / PRACTICAL QUESTIONS
## (Done on paper or whiteboard)
## ═══════════════════════════════════════════

---

**Q: "Write a SQL query to find all bookings made in the last 30 days with status 'Confirmed'."**
```sql
SELECT b.BookingId, b.FullName, b.TotalPrice, p.Name AS PackageName
FROM Bookings b
INNER JOIN Packages p ON b.PackageId = p.Id
WHERE b.Status = 'Confirmed'
  AND b.CreatedAt >= DATEADD(day, -30, GETDATE())
ORDER BY b.CreatedAt DESC;
```

---

**Q: "Write a SQL query to find the top 3 most booked packages."**
```sql
SELECT TOP 3
    p.Name,
    COUNT(b.Id) AS TotalBookings,
    SUM(b.TotalPrice) AS TotalRevenue
FROM Packages p
LEFT JOIN Bookings b ON b.PackageId = p.Id
GROUP BY p.Id, p.Name
ORDER BY TotalBookings DESC;
```

---

**Q: "Write a C# method that returns true if a string is a palindrome."**
```csharp
public bool IsPalindrome(string s)
{
    s = s.ToLower().Replace(" ", "");
    int left = 0, right = s.Length - 1;
    while (left < right)
    {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

---

**Q: "What is wrong with this code? How would you fix it?"**
```csharp
// Wrong:
public User GetUser(int id)
{
    return _dbContext.Users.Find(id);
}
// Problem 1: Synchronous — blocks the thread
// Problem 2: Returns null if not found — caller might crash with NullReferenceException
```
```csharp
// Fixed:
public async Task<User?> GetUserAsync(int id)
{
    return await _dbContext.Users.FindAsync(id);
    // Caller must handle null: var user = await GetUserAsync(5) ?? throw new Exception("Not found");
}
```

---

**Q: "What is the difference between `==` and `.Equals()` in C#?"**

> "For value types (int, bool, struct) — both work the same. For reference types (classes, strings): `==` by default compares references (same memory address). `.Equals()` is overridable to compare values. String is special — C# overrides `==` for strings to compare content. For custom objects, override `.Equals()` and `GetHashCode()` to define equality by value."

---

## ═══════════════════════════════════════════
## PART 10 — BEHAVIORAL QUESTIONS
## (They test your attitude, not just technical skill)
## ═══════════════════════════════════════════

---

**Q: "Tell me about a time you faced a bug you couldn't solve."**

> "During development, I had a bug where the booking creation would succeed but the package's available seats weren't being decremented. I debugged for hours. The issue was that I was calling `UpdateAsync(package)` after the seat deduction, but the package entity was loaded inside a separate `using` scope and the DbContext wasn't tracking it properly. I fixed it by loading the package within the same `UnitOfWork` scope and calling `SaveChangesAsync()` once at the end. This taught me deeply how EF Core's change tracking works."

---

**Q: "Why do you want this internship?"**

> "I want to work with a professional team on a real product with real users and real constraints — code reviews, deployment pipelines, team collaboration. My personal project taught me the technical side. An internship will teach me how software is built at scale in a team environment — communication, code standards, version control workflows, and receiving and giving feedback. I want to grow from a developer who codes alone to one who builds effectively with a team."

---

**Q: "Where do you see yourself in 2 years?"**

> "In 2 years, I want to be confident enough to take ownership of features end-to-end — from requirement gathering to deployment. I want to deepen my understanding of system design, performance optimization, and cloud deployment. I'm also interested in [mention specific tech the company uses] which I'd love to learn from experienced engineers here."

---

**Q: "What do you do when you don't know how to solve a problem?"**

> "First, I break the problem down into smaller parts and try to identify exactly where the issue is. Then I check official documentation. If still stuck, I search for similar problems (Stack Overflow, GitHub issues). If I'm in a team, I'll try for a reasonable time (30-60 min) on my own before asking for help — with a clear description of what I tried. I never stay stuck silently for hours in a team setting."

---

## ═══════════════════════════════════════════
## PART 11 — TRICKY QUESTIONS & HOW TO HANDLE
## (Questions designed to catch you off guard)
## ═══════════════════════════════════════════

---

**"You said you used Clean Architecture. What's the difference between Clean Architecture and MVC?"**

> "MVC (Model-View-Controller) is a presentation pattern — it organizes the UI layer. Clean Architecture is a full system architecture that goes beyond UI. It defines how ALL layers relate — business rules are at the center, UI and database are at the outer edges and depend inward, never the reverse. My project uses MVC within the API layer (Controllers are the C, DTOs act as the View model), but the full system design is Clean Architecture."

---

**"You used `async/await` everywhere. Could there be any downside?"**

> "Yes — `async/await` has a small overhead for very fast, in-memory operations due to state machine generation by the compiler. For CPU-bound work that completes in microseconds, synchronous code is faster. However, for I/O-bound operations like database queries and HTTP calls — which dominate web APIs — the scalability benefits of async far outweigh the small overhead. All my async calls are DB operations, so it's the right choice here."

---

**"Your `UnitOfWork` uses a `Hashtable`. Why not `Dictionary<string, object>`?"**

> "That's a great observation — actually, `Dictionary<string, object>` would be the more modern, type-safe choice and would avoid the boxing overhead of `Hashtable`. I used `Hashtable` following a common pattern example. In production code, I would refactor to `Dictionary<string, object>` or even `Dictionary<Type, object>` for full type safety."

---

**"How do you handle concurrent bookings? What if two users try to book the last seat simultaneously?"**

> "This is a race condition. Currently, my code reads `AvailableSeats`, checks, then decrements — which has a window for a race condition. The proper fix is **optimistic concurrency** in EF Core — adding a `RowVersion` or `ConcurrencyToken` to the Package entity. If two users update the same row simultaneously, EF Core throws a `DbUpdateConcurrencyException` for the second request. Alternatively, a database-level `UPDATE Packages SET AvailableSeats = AvailableSeats - @count WHERE Id = @id AND AvailableSeats >= @count` as a single atomic SQL operation would fully solve it. This is something I'd implement given more time."

---

**"You said you built this project alone. How do you know your architecture is good?"**

> "I validated against established principles: the layers have clear boundaries (Domain has no dependencies), the SOLID principles are followed (single responsibility, dependency inversion), and each new feature I added (Blogs, Destinations) required only adding files, not modifying existing ones — which is the Open/Closed principle in practice. I also read the Microsoft clean architecture documentation and compared my implementation. That said, a code review from an experienced engineer would certainly surface improvements — which is exactly what I'm hoping to get from an internship."

---

## ═══════════════════════════════════════════
## PART 12 — "ANY QUESTIONS FOR US?" SECTION
## (Always prepare 3-4 smart questions)
## ═══════════════════════════════════════════

> **Never say "No, I think I'm good."** Asking good questions shows genuine interest.

**Smart questions to ask:**
1. "What does the typical onboarding look like for interns? What would my first week involve?"
2. "What tech stack does the team currently use for production systems? Is it similar to what I used?"
3. "How does the team handle code reviews? Is there a PR review process interns participate in?"
4. "What are the biggest technical challenges the team is currently working on?"
5. "What's the path from intern to junior developer at this company?"

---

## ═══════════════════════════════════════════
## PART 13 — LAST-MINUTE CONFIDENCE CHECKLIST
## ═══════════════════════════════════════════

Before you walk in, make sure you can say YES to all of these:

- [ ] I can explain my project in 60 seconds clearly
- [ ] I can draw the architecture diagram from memory
- [ ] I know what each Controller does (Auth, Packages, Bookings, Dashboard, Blogs, Upload)
- [ ] I can explain what happens step-by-step when someone logs in
- [ ] I can explain what happens step-by-step when someone creates a booking
- [ ] I can explain the 4 OOP pillars with examples from my code
- [ ] I can explain Repository Pattern, Unit of Work, and Dependency Injection
- [ ] I know Primary Key vs Foreign Key and can describe my schema
- [ ] I know what JWT is and how the token flow works
- [ ] I know why I used Next.js over plain React (SSR / SEO)
- [ ] I have 3-4 smart questions ready to ask them

---

## PANIC ANSWER TEMPLATE
### (If you get a question you don't know)

> **Never say "I don't know" and stop.** Say this instead:

> "I haven't worked with that specific concept directly, but let me reason through it. Based on what I know about [related concept you DO know], I'd expect it to work like [your best guess]. In practice, I'd look at the official documentation and [framework] source code to confirm. Is that close to the right direction?"

---

*ඔයා ගැන ඔයාට විශ්වාස තියෙනවා. ඒ code ඔයා ලිව්වා. ඔයා debug කළා. ඔයා deploy කළා. දැන් explain කරන්නෙ ඔයා.*

*Good luck. Go get it.*

---
---

## ═══════════════════════════════════════════
## PART 14 — COMMONLY MISSED BUT CRITICAL TOPICS
## ( මේවා miss කරනෙ නෑ — ඔක්කොම interview වල එනවා)
## ═══════════════════════════════════════════

---

## CORS — Cross-Origin Resource Sharing

### Why this WILL come up in your interview
ඔයාගේ project ලෙස Frontend Port 3000, Backend Port 5000. Different origins. Browser default ලෙස block කරනවා.

### What is CORS?
Browser security feature. `http://localhost:3000` ඉඳලා `http://localhost:5000/api` ලාව request යද්දි — browser origin check කරනවා. Same origin (same domain+port) නොවේ නම් block.

**Real World:** Bank building ඇතුළෙ ඉඳලා pizza shop ලාව walk-in කරන්නෙ free. ඒත් bank building ලාව outsider ගෙ telephone ගිහිල්ලා "ඒ customer ගෙ balance කොච්ච?" කිව්ව — bank security block කරනවා. CORS = browser's security guard.

### Your Project — How you solved it
`Program.cs` ලෙ CORS policy configure කරලා:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader());
});

app.UseCors("AllowFrontend");
```

### Interview Answer
> "CORS is a browser security mechanism that blocks HTTP requests from one origin to another by default. My frontend runs on port 3000 and backend on port 5000 — different origins. I configured a CORS policy in `Program.cs` to explicitly allow `http://localhost:3000` to make requests to my API. Without this, every Axios call would fail with a CORS error in the browser."

---

## N+1 Query Problem & Eager Loading vs Lazy Loading

### The N+1 Problem (Very common EF Core question!)
Imagine you load 10 bookings. For each booking, you separately load the Package. That's 1 query for bookings + 10 queries for packages = **11 queries**. This is the N+1 problem.

```csharp
// BAD — N+1 Problem
var bookings = await _dbContext.Bookings.ToListAsync();  // 1 query
foreach (var b in bookings)
{
    var name = b.Package.Name; // EF fires 1 query PER booking = N queries
}
// Total: 1 + N queries
```

### How you solved it — Eager Loading with `.Include()`
```csharp
// GOOD — Eager Loading (1 query with JOIN)
var bookings = await _unitOfWork.Repository<Booking>()
    .Query()
    .Include(b => b.Package)   // SQL JOIN — 1 query total
    .Include(b => b.User)
    .ToListAsync();
```

Or in `BookingService` Select projections — EF Core automatically JOINs:
```csharp
.Select(b => new BookingDto
{
    PackageName = b.Package != null ? b.Package.Name : "",  // EF JOINs automatically
})
```

### Lazy Loading vs Eager Loading vs Explicit Loading
- **Lazy Loading** — Related data loaded on demand when you access it (fire separate query at that moment). Requires virtual navigation properties. Easy to accidentally cause N+1.
- **Eager Loading** — Load related data UPFRONT with `.Include()`. One JOIN query. My project uses this.
- **Explicit Loading** — Manually load related data when needed with `.Entry().Collection().LoadAsync()`. Full control.

### Interview Answer
> "The N+1 problem is when you execute 1 query to get a list, then N additional queries to get related data for each item. I avoid it by using Eager Loading with `.Include()` in EF Core, which generates a single SQL JOIN query instead of N+1 separate queries."

---

## Hash vs Encryption vs Encoding

### Real World Analogy
- **Encoding:** Like Base64. "Hello" → "SGVsbG8=". Not secure — anyone can reverse it. Just a format change.
- **Encryption:** Lock with a key. Message locked → needs the SAME or related key to unlock. Reversible with the key. (SSL/HTTPS uses this)
- **Hashing:** Grinder. Put data in → one-way output. Cannot reverse. Same input ALWAYS gives same output. (BCrypt, SHA256)

### In Your Project
```csharp
// Hashing — ONE WAY. Cannot get password back from hash.
private string HashPassword(string password)
    => BCrypt.Net.BCrypt.HashPassword(password);

// Verify — re-hash the input and compare, never "decrypt"
private bool VerifyPassword(string password, string hash)
    => BCrypt.Net.BCrypt.Verify(password, hash);
```

Why BCrypt over SHA256?
- BCrypt is **slow by design** — prevents brute force attacks
- BCrypt includes **automatic salt** — prevents rainbow table attacks
- SHA256 is fast and deterministic — bad for passwords

### Interview Answer
> "Hashing is one-way — you can't reverse it. We store only the BCrypt hash of the password in the database. At login, we hash the input and compare hashes. We never store or transmit the plain password. BCrypt is specifically designed for passwords — it's slow and includes a salt, making brute force and rainbow table attacks impractical."

---

## JWT Storage — Cookies vs localStorage vs sessionStorage

### Real World Analogy
- **localStorage** — Permanent notebook on your desk. Survives browser close. Anyone with your desk access can read it.
- **sessionStorage** — Sticky note. Gone when you close the tab.
- **HttpOnly Cookie** — Sealed envelope given to browser. Browser sends it automatically. JavaScript CANNOT read it (XSS safe).

### Security Comparison
| Storage | XSS Attack Risk | CSRF Attack Risk | Persists |
|---|---|---|---|
| **localStorage** | HIGH (JS can read) | Low | Yes |
| **sessionStorage** | HIGH | Low | No |
| **HttpOnly Cookie** | Low (JS can't read) | HIGH | Configurable |

### In Your Project
Your frontend stores JWT in localStorage/memory (via Zustand). This is the common approach for SPAs. For production, `HttpOnly` cookies are more secure against XSS.

### Interview Answer
> "localStorage is convenient but vulnerable to XSS attacks — malicious JavaScript can read the token. HttpOnly cookies can't be accessed by JavaScript at all, making them XSS-safe, but they require CSRF protection. For an intern project, localStorage is acceptable. In production, I'd use HttpOnly cookies with CSRF tokens and also implement token refresh for better UX."

---

## Middleware in ASP.NET Core

### Real World Analogy
Airport security conveyor belt. Your bag goes through:
1. X-ray machine (Authentication check)
2. Explosives scanner (Authorization check)
3. Belt scale (Request logging)
4. Final gate (Controller reaches your request)

Each step can PASS the request forward or STOP it.

### How it works in your project
`Program.cs` defines the middleware pipeline:
```csharp
app.UseHttpsRedirection();   // Step 1: Redirect HTTP to HTTPS
app.UseCors("AllowFrontend"); // Step 2: CORS check
app.UseAuthentication();      // Step 3: "Who are you?" — validates JWT
app.UseAuthorization();       // Step 4: "Are you allowed?" — checks [Authorize]
app.MapControllers();         // Step 5: Route to the right Controller
```
**ORDER MATTERS.** `UseAuthentication()` MUST come before `UseAuthorization()`. You have to know WHO someone is before checking what they're allowed to do.

### Interview Answer
> "Middleware in ASP.NET Core is a pipeline — each component processes the HTTP request and either passes it to the next middleware or short-circuits it. In my `Program.cs`, CORS runs before Authentication, which runs before Authorization. If a request has no JWT, `UseAuthentication` marks it as anonymous. When it reaches `[Authorize]`, it returns 401 without ever hitting the controller."

---

## Git — Version Control (Always asked!)

### Commands you must know
```bash
git init                    # Initialize new repo
git clone <url>             # Copy remote repo locally
git status                  # What files changed?
git add .                   # Stage all changes
git add <file>              # Stage specific file
git commit -m "message"     # Save snapshot
git push origin main        # Upload to GitHub
git pull                    # Download latest from remote
git branch feature/login    # Create new branch
git checkout feature/login  # Switch to branch
git merge feature/login     # Merge branch into current
git log --oneline           # See commit history
```

### Interview Answer: "What is the difference between git merge and git rebase?"
> "Both integrate changes from one branch into another. `git merge` creates a new 'merge commit' that preserves the full history of both branches — you can see exactly where branches diverged and joined. `git rebase` rewrites the branch history to appear linear — it moves the commits to the tip of the target branch. Rebase gives a cleaner history but rewrites commits. For team work on shared branches, merge is safer. I used basic commit, push, and pull for my project on GitHub."

### Interview Answer: "What is a .gitignore file?"
> "A `.gitignore` file tells Git which files to NOT track. For example, `node_modules/` (thousands of files), `.env` (contains secrets like database passwords and JWT keys), `bin/`, `obj/` (compiled outputs). We never commit secrets to a public GitHub repository — they go in `.env.local` which is gitignored."

---

## "What happens when you type a URL in the browser?" (System Design Classic)

This question is asked frequently. Here's the full answer for your project:

**When someone visits `http://localhost:3000/packages`:**

1. **DNS Resolution** — Browser checks if `localhost` resolves to `127.0.0.1` (local loopback).
2. **TCP Connection** — Browser opens a connection to the Next.js server on port 3000.
3. **HTTP Request** — Browser sends `GET /packages HTTP/1.1` to Next.js.
4. **Next.js Server** — If SSR, Next.js server-side renders the page. It calls `GET http://localhost:5000/api/packages` to the .NET API.
5. **ASP.NET Core Pipeline** — Request passes through middleware: CORS → Authentication → Authorization → PackagesController.
6. **Controller → Service → Repository** — `PackagesController.GetAll()` → `PackageService.GetAllAsync()` → `Repository<Package>.Query().ToListAsync()`.
7. **SQL Server** — EF Core executes `SELECT * FROM Packages WHERE IsActive = 1 ...`.
8. **Response chain** — Data flows back: SQL → Repository → Service (mapped to PackageDtos) → Controller (`Ok(...)`) → ASP.NET Core → Next.js → HTML rendered → Browser displays.
9. **React hydration** — Browser downloads the pre-rendered HTML, then React "hydrates" it (attaches event listeners, makes it interactive).

### Interview Answer (Short version)
> "The browser resolves the URL, connects to the Next.js server, which server-side renders the page by calling our .NET REST API. The API processes through the middleware pipeline, hits the Controller, delegates to the Service, calls the Repository which queries SQL Server via EF Core. Data flows back up as JSON, Next.js renders HTML and sends it to the browser, then React hydrates it to make it interactive."

---

## Environment Variables & Secrets Management

### Why important
`appsettings.json` in your project has the JWT secret key and database connection string. If these are pushed to public GitHub — anyone can access your database and forge JWT tokens. Critical security risk.

### Your Project Setup
```json
// appsettings.json — committed to git (no real secrets)
{
  "Jwt": {
    "Key": "your-secret-key-here",
    "Issuer": "TravelEaseAPI",
    "Audience": "TravelEaseClient"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TravelEaseDb;..."
  }
}
```

For production: use **environment variables** or **Azure Key Vault** so secrets never touch the codebase.

### Interview Answer
> "Sensitive configuration like JWT secret keys and database connection strings should never be hardcoded in source files that are committed to Git. For local development, I use `appsettings.Development.json` which is gitignored. In production, environment variables or a secrets manager like Azure Key Vault would be used so secrets are injected at runtime, not stored in code."

---

## Pagination — How and Why

### Real World Analogy
Google search results. Google doesn't load ALL 2 billion results at once. Page 1 = results 1-10. Page 2 = results 11-20. This is pagination.

### Your Project Code
```csharp
// PackageService.GetAllAsync()
var packages = await query
    .Skip((page - 1) * pageSize)  // Skip previous pages
    .Take(pageSize)                // Take only this page's items
    .ToListAsync();
```
API response includes:
```json
{ "data": [...], "total": 45, "page": 2, "pageSize": 10 }
```
Frontend can calculate: total pages = Math.ceil(45/10) = 5.

### Interview Answer
> "Without pagination, fetching all packages would load thousands of records into memory, making the API slow and wasting bandwidth. I implemented server-side pagination using `.Skip()` and `.Take()` in EF Core. The client sends `page=2&pageSize=10`, the API skips the first 10 records and returns the next 10. The total count is returned separately so the frontend can calculate and display page numbers."

---

## Summary of Everything Added

| Topic | Key Point |
|---|---|
| **CORS** | Frontend (3000) & backend (5000) = different origins. Configure AllowedOrigins in Program.cs |
| **N+1 Problem** | Load 10 bookings + 10 separate package queries = 11 queries. Solved with `.Include()` |
| **Eager vs Lazy Loading** | `.Include()` = JOIN upfront (eager). Lazy = separate query when accessed |
| **Hash vs Encrypt vs Encode** | Hash = one-way (BCrypt). Encrypt = reversible with key (HTTPS). Encode = format change (Base64) |
| **JWT Storage** | localStorage = convenient but XSS risk. HttpOnly Cookie = XSS safe but needs CSRF protection |
| **Middleware** | Request pipeline in .NET. Order matters: CORS → Auth → Authz → Controller |
| **Git** | add → commit → push. .gitignore secrets. merge vs rebase |
| **URL → Response** | DNS → TCP → Next.js → API → Middleware → Controller → Service → Repository → SQL → back |
| **Environment Variables** | Never commit secrets to Git. Use appsettings.Development.json or env vars |
| **Pagination** | `.Skip((page-1)*size).Take(size)` — server-side, return total for frontend to calculate pages |

---

---

## ═══════════════════════════════════════════
## PART 15 — TECHNICAL DETAILS INTERVIEWERS DIG INTO
## (ඔයාගේ exact code ඉඳලා deep questions)
## ═══════════════════════════════════════════

---

## `IQueryable<T>` vs `IEnumerable<T>` — Very Important!

### What's the difference?
This appears directly in your `IRepository<T>`:
```csharp
IQueryable<T> Query();  // Returns IQueryable
```

| | `IEnumerable<T>` | `IQueryable<T>` |
|---|---|---|
| **Where filtering runs** | In-memory (C# side) | Database side (SQL WHERE clause) |
| **When data is fetched** | All data fetched first, THEN filtered | Only matching data fetched |
| **Use for** | In-memory collections, already-fetched data | Database queries via EF Core |
| **Performance** | Slow for large data | Fast — minimal data transferred |

### Real Example
```csharp
// IEnumerable — BAD: Fetches ALL packages, THEN filters in C# memory
IEnumerable<Package> all = await _repo.GetAllAsync(); // SELECT * FROM Packages (all rows!)
var cheap = all.Where(p => p.Price < 5000);           // Filtered in C# memory

// IQueryable — GOOD: Filters in SQL Server, minimal data fetched
IQueryable<Package> query = _repo.Query();
var cheap = query.Where(p => p.Price < 5000)           // Becomes SQL WHERE Price < 5000
                 .ToListAsync();                        // Only cheap packages fetched
```

In your `PackageService`, you chain `.Where()`, `.OrderBy()`, `.Skip()`, `.Take()` on `IQueryable` — EF Core builds ONE optimized SQL query from all of this.

### Interview Answer
> "`IQueryable` is a deferred query — operations like `.Where()` don't execute immediately. EF Core builds the SQL query as you chain LINQ methods, and only runs it when you call `.ToListAsync()`. `IEnumerable` operates in memory — it would load all records from the database first, then filter in C#. For database queries, `IQueryable` is always preferred because it translates to efficient SQL."

---

## ASP.NET Core Attributes — What do they mean?

Interviewers often ask about the attributes on your controllers.

```csharp
[ApiController]          // Enables automatic model validation, problem details, etc.
[Route("api/[controller]")]  // URL = /api/packages (controller name without "Controller")
public class PackagesController : ControllerBase
{
    [HttpGet]                    // Responds to GET /api/packages
    [HttpGet("{id}")]             // Responds to GET /api/packages/5
    [HttpPost]                   // Responds to POST /api/packages
    [HttpPut]                    // Responds to PUT /api/packages
    [HttpDelete("{id}")]         // Responds to DELETE /api/packages/5

    [FromBody] CreatePackageDto dto    // Read from request body (JSON)
    [FromQuery] string? search         // Read from URL query string (?search=beach)
    [FromRoute] int id                 // Read from URL path (/api/packages/5)

    [Authorize]                  // JWT required (any authenticated user)
    [Authorize(Roles = "Admin")] // JWT required AND role must be "Admin"
}
```

### Interview Answer: "What does `[ApiController]` do?"
> "`[ApiController]` enables several automatic behaviors: automatic model validation (if the request body is invalid, it returns 400 BadRequest automatically), binding source inference (`[FromBody]` for complex types, `[FromRoute]` for route params), and problem details format for error responses. Without it, I'd need to manually check `ModelState.IsValid` in every action."

---

## `IActionResult` vs Specific Return Types

```csharp
// IActionResult — Flexible, can return any HTTP response
public async Task<IActionResult> GetAll()
{
    var packages = await _packageService.GetAllAsync();
    return Ok(packages);        // 200 OK with data
    return NotFound();          // 404 Not Found
    return BadRequest("error"); // 400 Bad Request
    return Forbid();            // 403 Forbidden
    return Unauthorized();      // 401 Unauthorized
}

// ActionResult<T> — Type-safe, better for Swagger documentation
public async Task<ActionResult<PackageDto>> GetById(int id)
{
    var package = await _packageService.GetByIdAsync(id);
    if (package == null) return NotFound();
    return Ok(package); // Strongly typed
}
```

### Interview Answer
> "I use `IActionResult` as the return type for my controller actions because it's flexible — I can return `Ok()`, `NotFound()`, `BadRequest()`, or `Forbid()` from the same method depending on the business outcome. `IActionResult` lets me control both the HTTP status code and the response body from one method."

---

## What is Scalar? (from your backend.csproj)

Your project uses `Scalar.AspNetCore` — a modern alternative to Swagger UI for API documentation.

```xml
<PackageReference Include="Scalar.AspNetCore" Version="2.16.5" />
```

It auto-generates an interactive API documentation page at `/scalar/v1` where you can browse all your endpoints, see request/response schemas, and test APIs directly. It reads from OpenAPI/Swagger definitions.

### Interview Answer
> "My project uses Scalar for API documentation. Scalar generates an interactive UI that lists all my API endpoints, their expected request bodies, response schemas, and status codes. During development, I used it to test my API endpoints without needing a frontend — similar to Postman but auto-generated from my controllers."

---

## ═══════════════════════════════════════════
## PART 16 — ATTITUDE, MINDSET & SOFT SKILLS
## (Technical skills get you shortlisted. This gets you hired.)
## ═══════════════════════════════════════════

---

## The Mindset That Gets Interns Hired

Sri Lankan software companies — especially at intern level — are NOT looking for someone who knows everything. They are looking for:

1. **Someone who can learn fast** — Show curiosity. "I didn't know that, but that's interesting — how does it work?"
2. **Someone who takes ownership** — "I built this myself. I debugged this. I made this decision." Not "I followed a tutorial."
3. **Someone who communicates clearly** — A developer who can explain their thinking is 10x more valuable than one who can't.
4. **Someone humble but confident** — Confident about what they know. Humble about what they don't. Not arrogant. Not apologetic.

---

## How to SHOW Ownership of Your Project

When an interviewer asks about your project — the WRONG way vs the RIGHT way:

❌ **Wrong:** "I followed a YouTube tutorial on Clean Architecture and implemented it."

✅ **Right:** "I designed the architecture based on my research into Clean Architecture principles. I chose it because the project needed clear separation of concerns — if I want to swap the database from SQL Server to PostgreSQL in the future, only the Infrastructure layer changes. I validated this decision as I built it — adding the Blog and Destination features followed the same pattern without touching existing code."

The difference: **you made decisions. You understood why. You validated it.**

---

## Attitude Tips — What Interviewers Notice

### ✅ Things that impress them:
- **Ask clarifying questions before answering.** "When you say 'design pattern', do you mean structural, behavioral, or creational?" Shows thinking, not panic.
- **Think out loud.** "Let me think through this... I know CORS is a browser security feature, and in my project both ports are different, so..." They want to see HOW you think.
- **Reference your own code.** "In my BookingService, line X, I handle this exactly." Shows you actually built it.
- **Acknowledge improvements honestly.** "I know the file upload doesn't have auth — in production I'd add [Authorize] and validate file types." Shows maturity.
- **Smile and maintain eye contact.** Simple but rare.

### ❌ Things that hurt you:
- Saying "I don't know" and going silent. (Instead: reason through it out loud.)
- Memorized robotic answers with no personal connection.
- Claiming things you can't back up. ("I used microservices" — "What's the difference between sync and async microservice communication?" — "uh...")
- Speaking faster than you think when nervous. Slow down.
- Apologizing for things. "Sorry, I know this is a bad approach..." — Own your decisions.

---

## How to Handle "I Don't Know" Like a Senior Dev

Interns who say "I don't know" and stop = dismissed.
Interns who say "I don't know" and reason through it = remembered.

**Template:**
> "I haven't worked with [X] directly, but based on what I know about [related concept], I'd reason that [your best logical guess]. Is that in the right direction?"

**Real example:**
Interviewer: "What is a deadlock in SQL Server?"
You: "I haven't experienced a deadlock directly, but based on how transactions work — a deadlock would happen when two transactions are each waiting for a resource the other has locked. Transaction A holds Table1 and needs Table2. Transaction B holds Table2 and needs Table1. They're both waiting forever. SQL Server detects this and kills one transaction. Is that correct?"

That answer shows a thinking process. It shows you can reason. Even if slightly wrong, that's impressive for an intern.

---

## Showing Passion (Without Overacting)

Interviewers in Sri Lanka at mid-size to large companies (99x, Sysco, WSO2, SLIIT projects, Virtusa, IronOne etc.) appreciate genuine enthusiasm over performed enthusiasm.

**Genuine enthusiasm sounds like:**
> "Honestly, setting up Clean Architecture was frustrating at first because the dependency rules kept breaking. But when I finally got it working and added the Blog module in under 2 hours without touching any existing code — I actually understood why the pattern exists. That was a good moment."

That story is personal, specific, real. It shows you struggled, persisted, and learned. That's exactly what an intern hiring manager wants to hear.

---

## "Why should we hire YOU as our intern?"

This is almost always asked. Prepare this answer.

> "I've already built a production-level full-stack application using technologies your team likely uses — ASP.NET Core, Next.js, SQL Server. I understand Clean Architecture, REST API design, JWT security, and database design practically, not just theoretically. More importantly, I built this alone, which means I'm used to finding answers independently — reading documentation, debugging, reasoning through problems. I won't freeze when things don't work. I'll figure it out. And I'll ask the right questions when I need to. I'm here to contribute, learn from your team, and grow fast."

---

## ═══════════════════════════════════════════
## PART 17 — COMMON INTERN MISTAKES TO AVOID
## ═══════════════════════════════════════════

---

### ❌ Mistake 1: Over-claiming on the CV
Saying "proficient in Kubernetes, Docker, CI/CD, microservices" when you've only watched a YouTube video.
An interviewer will probe. If you can't back it up, it destroys trust.

✅ **Fix:** Say "familiar with" or "I've explored." Only say "experienced with" for things you've actually built.

---

### ❌ Mistake 2: Not knowing YOUR OWN project
Saying you built something but not knowing how the auth works, or what an interface is, or why you chose that pattern.
This is the most damaging thing in an intern interview.

✅ **Fix:** You've read this entire guide. You know your project. You're fine.

---

### ❌ Mistake 3: Copy-paste answers
"Encapsulation is the bundling of data and methods that operate on that data within a single unit called a class, hiding internal state from the outside world."
That's Wikipedia. Interviewers know.

✅ **Fix:** Always add your own project example after the definition.

---

### ❌ Mistake 4: Not asking good questions
"Any questions for us?" → "No, I'm good."
This signals low interest.

✅ **Fix:** Always have 3 questions ready. (See Part 12.)

---

### ❌ Mistake 5: Underselling your project
"It's just a basic CRUD app."
It's NOT. It has Clean Architecture, JWT auth, role-based access, booking inventory management, admin dashboard. That's real.

✅ **Fix:** "I built a full-stack travel booking platform with role-based JWT authentication, Clean Architecture backend, and a server-side rendered Next.js frontend." Own it.

---

### ❌ Mistake 6: Memorizing but not understanding
You can say "Repository Pattern" but if asked "why not just use DbContext directly in the controller?" you go blank.

✅ **Fix:** Understand the WHY behind every pattern. This guide explains the WHY for everything.

---

## ═══════════════════════════════════════════
## PART 18 — INTERVIEW DAY LOGISTICS
## ═══════════════════════════════════════════

### The night before:
- [ ] Read through the self-introduction (Part 2) one last time. Say it out loud.
- [ ] Read the Panic Template (Part 13). Accept that some questions will be unknown.
- [ ] Sleep. A rested mind answers better than an exhausted one.
- [ ] Charge your laptop. If they ask for a demo, you're ready.

### The morning of:
- [ ] Wear smart-casual minimum. Collared shirt. No crumpled clothes.
- [ ] Arrive 10-15 minutes early. Not 30. Not on time. 10-15 minutes early.
- [ ] Know the interviewer's name if possible. Use it once. "Thanks, [Name]."

### In the room:
- [ ] Greet warmly. Firm handshake. "Good [morning/afternoon], thank you for the opportunity."
- [ ] Sit up straight. Not stiff — natural. Slouching signals disinterest.
- [ ] Maintain eye contact when speaking. Look at the person asking, not the ceiling.
- [ ] Slow down when nervous. Nerves make you speak faster. Consciously slow down.
- [ ] When you don't know — pause, say "Let me think through that", reason out loud.
- [ ] When given feedback on a wrong answer — "That makes sense, thank you — I'll look into that."

### At the end:
- [ ] Ask your prepared questions (Part 12). Minimum 2.
- [ ] "Thank you for your time. I really enjoyed this conversation and I'm excited about this opportunity."
- [ ] Send a thank-you email if you have contact details. Simple, genuine, one paragraph.

---

## ═══════════════════════════════════════════
## FINAL — THE COMPLETE FILE REFERENCE
## ═══════════════════════════════════════════

| File | Read When | Purpose |
|---|---|---|
| 📄 `README.md` | Push to GitHub | Professional project showcase |
| 📄 `INTERVIEW_PREP.md` | 2-3 days before | Code-level Q&As, exact flow of every feature |
| 📄 `CONCEPTS_SIMPLIFIED.md` | 1 week before | Build genuine understanding with real-world analogies |
| 📄 `TRAINING_GUIDE.md` (this file) | Daily until interview | Full campus interview training — every topic covered |

### Suggested Study Plan:
- **Day 1-3:** Read `CONCEPTS_SIMPLIFIED.md`. Understand every concept with its analogy.
- **Day 4-5:** Read `INTERVIEW_PREP.md`. Map every Q&A back to your code.
- **Day 6:** Read `TRAINING_GUIDE.md` Parts 1-8. Practice self-intro out loud.
- **Day 7:** Read `TRAINING_GUIDE.md` Parts 9-18. Attitude, SQL, Frontend, Practical.
- **Day before interview:** Skim the Panic Template and confidence checklist.
- **Interview morning:** Read only the self-intro and the checklist.

---

*ඔයා ගැන ඔයාට විශ්වාස තියෙනවා.*
*ඒ code ඔයා ලිව්වා. ඔයා debug කළා. ඔයා deploy කළා.*
*ඔයා ගැන interview ලෙ explain කරන්නෙ ඔයා.*
*දැන් ඔයා ready.*

**Go get it. 🚀**

---
---

## ═══════════════════════════════════════════
## PART 19 — HOW TO STUDY THIS EFFICIENTLY
## (Files read කළා කිව්ව ලොකු ප්‍රයෝජනයක් නෑ. Active recall + practice ඕන.)
## ═══════════════════════════════════════════

---

## Week 1 — Understand (Memorize නෙවෙයි)

### Day 1-2 → `CONCEPTS_SIMPLIFIED.md`
- Passive read නෙවෙයි — **concept ගැන real-world analogy කියාගෙන read**
- "ATM = Encapsulation", "Steering wheel = Abstraction" — paper ලෙ ලියාගන්න
- ලිව්ව notes **phone camera ලෙ ගන්න** — idle time ලෙ review

### Day 3-4 → `INTERVIEW_PREP.md`
- Q&A section — **question cover කරලා ඔය words ලෙ try** කරලා ඊට පස්සේ check
- Code snippets — ඔය project ලෙ exact file open කරලා **match කරලා** read කරන්න

### Day 5-7 → `TRAINING_GUIDE.md` Parts 1-13
- **Self-intro (Part 2) — 5 times out loud.** Phone camera ලෙ record කරලා playback කරලා බලන්න. 60 seconds ද? Natural ද?
- SQL Q section — **pen & paper ලෙ queries ලිවීල්ලා** practice (type නෙවෙයි)
- Practical coding Q (Part 9) — paper ලෙ code ලියන්න, IDE ලෙ නෙවෙයි

---

## Week 2 — Simulate (Study නෙවෙයි)

### Day 8-10 → `TRAINING_GUIDE.md` Parts 14-18
- Attitude section (Part 16) — **mirror ලෙ ඉදිරිපිට** self-intro practice
- "Why hire you?" answer record කරලා playback

### Day 11-12 → Mock Interview
**Option A:** Friend / family member ළඟ ඉල්ලන්න random Q ටිකක් ඇහීමට.

**Option B:** ChatGPT ළඟ:
> "You are a Sri Lankan software company interviewer. Ask me intern-level technical questions one at a time about my full-stack project: ASP.NET Core backend with Clean Architecture, Next.js frontend, SQL Server database, JWT authentication. Start with an easy question."

AnswerGPT ලෙ දෙන්න. Push back කරාවිය — "Can you explain that further?" — handle කරන්නෙ කොහොමද practice.

### Day 13 → Light Review Only
- Confidence Checklist (Part 13) tick කරන්න
- Self-intro 3 times
- Panic Template memorize: *"I haven't worked with that directly, but based on what I know about [X], I'd reason..."*

### Day Before Interview → Rest
- Laptop charge කරන්න (demo ඉල්ලාවිය)
- Clothes ready
- Sleep. Tired brain = slow answers.

---

## The Most Efficient Trick — Phone Flashcards

ඔය INTERVIEW_PREP.md ලෙ Q&A sections ගෙන, phone ලෙ Notes app ලෙ **flashcard style** ලෙ save කරන්න:

```
Q: OOP 4 pillars?
A: Encapsulation (HashPassword private)
   Abstraction (IRepository hides EF Core)
   Inheritance (User:BaseEntity → gets Id, CreatedAt)
   Polymorphism (Repository<T> different type at runtime)
```

```
Q: Repository Pattern?
A: IRepository<T> defines WHAT (interface)
   Repository<T> implements HOW (EF Core)
   Service calls interface, never knows about SQL
```

```
Q: Unit of Work?
A: Groups DB operations. One SaveChangesAsync().
   Book + Seat deduct → both commit or both rollback.
```

```
Q: JWT flow?
A: Login → BCrypt verify → GenerateJwtToken() 
   → Claims(Id, Email, Role) → expires 7 days
   → Frontend stores → sends in Bearer header
```

Bus ලෙ, idle time ලෙ — **5 min flashcard review.** Week 2 ලෙ answers naturally come.

---

## ❌ Don't Do These

| Wrong Way | Why Bad |
|---|---|
| Files ඔක්කොම top-to-bottom passive read | Brain retain කරන්නෙ නෑ. Feels productive, isn't. |
| Interview day ලෙ answers memorize try | Robotic answers. Interviewers hate it. |
| "හෙට time ඇති" | There is no tomorrow. Start today. |
| Practice typing answers | Interview ලෙ talk කරන්නෙ. Practice speaking. |
| Read whole guide in one sitting | Spaced repetition > binge reading. |

---

## What to Read on Interview Morning

**Interview morning ලෙ ලොකු review එකක් කරන්නෙ එපා.** Anxiety increases.

Read only:
1. **Self-Introduction** (Part 2) — once, out loud
2. **Confidence Checklist** (Part 13) — tick ✓
3. **"Why hire you?" answer** — once
4. **Smart Questions to Ask** (Part 12) — 3 questions confirm

ඒකෙන් ඇති. ඔය brain ලෙ rest of the knowledge already ඇති.

---

## The Most Important Thing

Passive reading = 10% retention.
Active recall (self-testing) = 70% retention.
Teaching someone else = 90% retention.

**Best practice:** Explain your project to a friend who knows nothing about programming. If they understand the login flow, the booking flow, what the admin can do — you understand it well enough to explain to any interviewer.

---

*ඔයා ගැන ඔයාට විශ්වාස තියෙනවා.*
*ඒ code ඔයා ලිව්වා. ඔයා debug කළා. ඔයා deploy කළා.*
*දැන් study plan follow කරන්න. ඔයා ready වෙනවා.*

**Go get it. 🚀**


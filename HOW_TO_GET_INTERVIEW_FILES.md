# HOW TO GET INTERVIEW FILES FOR ANY PROJECT

> ඔය next project open කරලා, new Antigravity chat ලෙ පහළ prompt එක **copy-paste** කරලා send කරන්න.
> Me ඔය project files ඔක්කොම read කරලා **README + INTERVIEW_PREP + CONCEPTS_SIMPLIFIED + TRAINING_GUIDE** automatically හදනවා.

---

## ✅ COPY THIS PROMPT — PASTE IN NEW CHAT

```
I am preparing for software engineering internship interviews in Sri Lanka. I have a project open in my workspace right now.

Please do the following:

STEP 1 — Explore the entire project:
- List all directories and files
- Read ALL controller/route files
- Read ALL service/business logic files
- Read ALL entity/model/domain files
- Read ALL interface files
- Read package.json / .csproj / build files for exact technology versions
- Read any config files (Program.cs, appsettings.json, etc.)
Do NOT skip any files. Read everything before writing.

STEP 2 — After reading all code, create these 4 files in the project root:

1. README.md (overwrite if exists)
Professional internship-ready README with: exact tech stack from code (no guessing),
key features, ASCII architecture diagram, folder structure tree, accurate setup/run instructions.

2. INTERVIEW_PREP.md
Code-level interview guide with: full architecture explanation, layer-by-layer breakdown
with real code snippets, complete user flow walkthroughs (login, main features), OOP concepts
table mapped to real code locations, role-based authorization patterns, design patterns with
real examples, 20+ intern-level Q&As backed by actual code from this project, tricky advanced questions.

3. CONCEPTS_SIMPLIFIED.md
Real-world analogy guide for every concept used: OOP pillars (Encapsulation, Abstraction,
Inheritance, Polymorphism, Generics), design patterns (Repository, Unit of Work, DI, Soft Delete, DTO),
and key concepts (async/await, LINQ/Lambda, Exception Handling, REST API, Null Safety operators,
SOLID, CORS, Middleware, JWT storage, Hash vs Encrypt, Pagination, N+1 Problem,
IQueryable vs IEnumerable). Format each as:
Real World Analogy → My Project Code → Interview Answer.

4. TRAINING_GUIDE.md
Full campus interview training guide with: Sri Lankan software company interview format,
60-second self-intro template filled with MY project details, project walk-through Q&A,
OOP/design pattern/SQL/backend/frontend questions with project-specific answers,
live coding practice, behavioral questions, tricky questions, how to handle unknown questions,
attitude and mindset section, common intern mistakes, interview day logistics,
and a 2-week study plan with phone flashcard templates.

RULES:
- Read every relevant code file FIRST before writing anything
- Every answer must name actual files, classes, and methods from MY project
- No buzzwords or exaggerations
- No guessing technologies — only what is confirmed in the code files
- Make all files complete and detailed — no placeholders
```

---

## HOW TO USE

```
Step 1 → Open your project folder in VS Code / Antigravity
Step 2 → Open a NEW Antigravity chat (not this one)
Step 3 → Copy the prompt above
Step 4 → Paste and send
Step 5 → Wait — AI reads all files then creates all 4 files automatically
Step 6 → Follow the study plan in TRAINING_GUIDE.md Part 19
```

---

## AFTER GETTING THE FILES — STUDY PLAN

| Day | File | Method |
|---|---|---|
| Day 1-2 | `CONCEPTS_SIMPLIFIED.md` | Read with analogies. Write on paper. Phone photo. |
| Day 3-4 | `INTERVIEW_PREP.md` | Cover Q, try answer in own words, then check |
| Day 5-7 | `TRAINING_GUIDE.md` Parts 1-13 | Self-intro 5x out loud. SQL pen+paper. |
| Day 8-10 | `TRAINING_GUIDE.md` Parts 14+ | Mirror practice. "Why hire you?" record. |
| Day 11-12 | Mock interview | Friend OR ChatGPT mock |
| Day before | Light review | Checklist only |
| Morning of | 4 items only | Self-intro + Checklist + "Why hire you" + Questions |

---

## PHONE FLASHCARD TEMPLATE (Copy to Notes app)

```
Q: OOP 4 pillars?
A: Encapsulation = private methods (HashPassword)
   Abstraction = interface hides implementation (IRepository)
   Inheritance = child gets parent props (Entity:BaseEntity)
   Polymorphism = same method, different type at runtime (Repository<T>)
---
Q: Repository Pattern?
A: Interface defines WHAT. Class implements HOW.
   Service calls interface. Never knows about DB.
---
Q: Unit of Work?
A: Groups operations. One SaveChangesAsync(). 
   All succeed or all rollback.
---
Q: JWT flow?
A: Login → verify hash → generate token with claims
   → client stores → sends in header → server validates
---
Q: Why Clean Architecture?
A: Swap DB without touching business logic.
   Domain has zero dependencies.
   Outer layers depend inward, never outward.
---
Q: CORS?
A: Browser blocks cross-origin requests by default.
   Configure AllowedOrigins in Program.cs.
   Frontend port ≠ backend port = needs CORS config.
---
Q: N+1 Problem?
A: 1 query loads list + N queries for related data = slow.
   Fix: .Include() → one JOIN query.
---
Q: IQueryable vs IEnumerable?
A: IQueryable = filter in SQL (fast).
   IEnumerable = load all, filter in C# memory (slow).
   Always use IQueryable for DB queries.
---
Q: Dependency Injection?
A: Class receives dependencies via constructor, not new().
   Controller(IPackageService s) → .NET injects it.
   Benefits: Testability + Loose coupling.
---
Q: Soft Delete?
A: IsActive = false instead of DELETE FROM table.
   All queries filter: .Where(x => x.IsActive)
   Benefits: Recoverable, audit trail, no data loss.
---
Q: Abstract Class vs Interface?
A: Abstract class = blueprint with shared state (BaseEntity has Id, CreatedAt).
   Interface = contract only, no state (IRepository<T> method signatures only).
   Class: one abstract parent, many interfaces.
---
Q: async/await?
A: I/O operations release thread while waiting (non-blocking).
   await DB call → thread free → handles other requests.
   100 concurrent users → async handles all, sync blocks.
---
Q: Hash vs Encrypt vs Encode?
A: Hash = one-way (BCrypt password). Cannot reverse.
   Encrypt = reversible with key (HTTPS/SSL).
   Encode = format change (Base64). No security.
---
Q: Middleware order (.NET)?
A: CORS → UseAuthentication() → UseAuthorization() → Controllers
   ORDER MATTERS. Auth before Authz always.
---
Q: Pagination?
A: .Skip((page-1) * size).Take(size)
   Return total count → frontend calculates pages.
   Server-side = only needed records fetched.
---
Q: Generics?
A: Repository<T> where T : BaseEntity
   One class handles User, Package, Booking etc.
   where T : BaseEntity = type constraint (safety).
---
Q: SOLID — quick version?
A: S = One class, one job (Controller=HTTP, Service=Logic)
   O = Add features without changing existing code
   L = Child replaces parent safely (Repository<T>:IRepository<T>)
   I = Small focused interfaces (IAuthService, IPackageService)
   D = Depend on interface not concrete class (IPackageService not PackageService)
---
Q: Role-based auth?
A: Role stored in JWT claim → [Authorize(Roles="Admin")]
   Admin = sees everything. Customer = sees own data only.
   Row-level: if(booking.UserId != GetUserId()) return Forbid();
---
Q: Eager vs Lazy Loading?
A: Eager = .Include(b => b.Package) → one JOIN query upfront.
   Lazy = separate query fires when navigation property accessed.
   Always use Eager to avoid N+1.
---
Q: HTTP Status Codes?
A: 200 OK, 201 Created, 400 Bad Request,
   401 Unauthorized (no/invalid token),
   403 Forbidden (token valid but no permission),
   404 Not Found, 500 Server Error.
---
Q: Null Safety operators?
A: ?. = null conditional: b.Package?.Name (null instead of crash)
   ?? = null coalescing: b.Package?.Name ?? "" (default if null)
   ?? throw = b.Package ?? throw new Exception("not found")
---
Q: DTO (Data Transfer Object)?
A: Separate class for data transfer between layers.
   Reasons: Security (hides PasswordHash), Shape (adds joined fields),
   Versioning (API shape changes without touching entities).
---
Q: What is EF Core?
A: ORM - maps C# classes to database tables.
   LINQ queries → translated to SQL automatically.
   Migrations = version control for database schema.
---
Q: Git essential commands?
A: git add . → git commit -m "msg" → git push
   git pull → fetch latest. git branch → create branch.
   .gitignore → never commit node_modules, .env, bin/, obj/
---
Q: What is CORS?
A: Browser blocks requests between different origins (port/domain).
   Frontend 3000 → Backend 5000 = different origins = blocked.
   Fix: AddCors() + WithOrigins("http://localhost:3000") in Program.cs
---
Q: BCrypt vs MD5/SHA?
A: BCrypt = slow by design + automatic salt = safe for passwords.
   MD5/SHA = fast + no salt = vulnerable to brute force + rainbow tables.
   Never use MD5/SHA for passwords.
```

---

*ඔය project ඔය හදලා. ඒ experience real.*
*Same prompt. Same files. Same confidence. Go get it. 🚀*


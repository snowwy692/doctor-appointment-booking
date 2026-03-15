# 🏥 Doctor Appointment Booking System

A full-stack web application built with **ASP.NET Core Web API** and **Angular** that allows patients to book appointments with doctors, doctors to manage their schedules, and admins to oversee the entire system.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17 + TypeScript |
| Backend | ASP.NET Core 8 Web API |
| Database | PostgreSQL |
| ORM | Entity Framework Core |
| Authentication | JWT (JSON Web Tokens) |
| Styling | Bootstrap 5 |
| Tools | Visual Studio 2022, VS Code, Postman, pgAdmin 4 |

---

## 👥 User Roles

| Role | Permissions |
|---|---|
| **Patient** | Register, login, browse doctors, book/cancel appointments |
| **Doctor** | Login, view appointments, confirm or mark as done |
| **Admin** | Add/remove doctors, view all appointments |

---

## ✨ Features

- 🔐 JWT-based authentication with role-based authorization
- 👨‍⚕️ Browse doctors by specialization, experience and fees
- 📅 Book appointments with time slot selection
- ❌ Duplicate slot prevention
- 📊 Appointment status tracking: `Pending → Confirmed → Done / Cancelled`
- 🛠️ Admin dashboard to manage doctors and monitor appointments
- 📱 Responsive UI with Bootstrap 5

---

## 🗂️ Project Structure

```
doctor-appointment-booking/
├── backend/
│   └── DoctorAppointmentAPI/
│       ├── Controllers/        # AuthController, DoctorsController, AppointmentsController
│       ├── Models/             # User, Doctor, Appointment
│       ├── DTOs/               # Request/Response DTOs
│       ├── Data/               # AppDbContext
│       └── Program.cs          # App configuration
│
└── frontend/
    └── doctor-appointment-ui/
        └── src/app/
            ├── components/     # login, register, doctor-list, dashboards, etc.
            ├── services/       # auth, doctor, appointment services
            └── models/         # TypeScript interfaces
```

---

## 🗄️ Database Schema

```
Users         Doctors              Appointments
─────         ───────              ────────────
Id            Id                   Id
Name          UserId (FK→Users)    PatientId (FK→Users)
Email         Specialization       DoctorId (FK→Doctors)
PasswordHash  Experience           AppointmentDate
Role          Fees                 TimeSlot
                                   Status
```

---

## 🌐 API Endpoints

| Method | Endpoint | Role |
|---|---|---|
| POST | `/api/Auth/register` | Public |
| POST | `/api/Auth/login` | Public |
| GET | `/api/Doctors` | Public |
| POST | `/api/Doctors` | Admin |
| DELETE | `/api/Doctors/{id}` | Admin |
| POST | `/api/Appointments` | Patient |
| GET | `/api/Appointments/patient/{id}` | Patient |
| GET | `/api/Appointments/doctor/{id}` | Doctor |
| PUT | `/api/Appointments/{id}` | Doctor/Admin |
| DELETE | `/api/Appointments/{id}` | Patient |

---

## ⚙️ Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js v18+
- Angular CLI
- PostgreSQL + pgAdmin 4

---

### 🔧 Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/snowwy692/doctor-appointment-booking.git
cd doctor-appointment-booking/backend/DoctorAppointmentAPI
```

2. Update `appsettings.json` with your PostgreSQL credentials:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=DoctorAppointmentDB;Username=postgres;Password=YOUR_PASSWORD"
}
```

3. Run migrations to create the database:
```bash
dotnet ef database update
```

4. Run the API:
```bash
dotnet run
```

API will be available at: `http://localhost:5186`
Swagger UI: `http://localhost:5186/swagger`

---

### 🅰️ Frontend Setup

1. Navigate to frontend:
```bash
cd doctor-appointment-booking/frontend/doctor-appointment-ui
```

2. Install dependencies:
```bash
npm install
```

3. Run the Angular app:
```bash
ng serve
```

App will be available at: `http://localhost:4200`

---

## 🧪 Testing the App

### Register users via the app:
- Go to `http://localhost:4200/register`
- Register a **Patient** account
- Register a **Doctor** account

### Add doctor via Admin:
1. Register an **Admin** account (use Postman or Swagger for first admin)
2. Login as Admin → Go to Admin Dashboard
3. Enter the Doctor's User ID → Fill details → Click **Add Doctor**

### Book an appointment:
1. Login as Patient
2. Browse doctors → Click **Book Appointment**
3. Select date and time slot → Confirm

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Login | JWT-based secure login |
| Doctor List | Browse doctors with specialization & fees |
| Book Appointment | Date & time slot selection |
| Patient Dashboard | View & cancel appointments |
| Doctor Dashboard | Confirm or mark appointments done |
| Admin Dashboard | Manage doctors & view all appointments |

---

## 👨‍💻 Author

**Harsh Sheladiya**
- GitHub: [@snowwy692](https://github.com/snowwy692)
- Email: harshsheladiya31@gmail.com
- University: Lok Jagruti Kendra University, Ahmedabad
- Course: Dot Net — Semester V (B.E. Computer Engineering)

---

## 📄 License

This project is for educational purposes as part of the Dot Net course submission.

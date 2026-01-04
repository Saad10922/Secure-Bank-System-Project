# SecureBankCloud

SecureBankCloud is a modern, enterprise-grade web application prototype designed to simulate a multi-cloud encrypted storage system for banking institutions. It demonstrates a secure, role-based environment for managing sensitive financial data with visuals for end-to-end encryption and cloud redundancy.

## 🚀 Features

### Role-Based Access Control (RBAC)
The application features a dual-login system separating operational duties from system oversight:
- **Bank Administrator**: 
  - Full access to sensitive data operations.
  - Upload, Fetch, Update, and Delete encrypted financial records.
  - Visuals for multi-cloud distribution (AWS, Azure, GCP).
- **System Administrator**: 
  - Read-only access for compliance and monitoring.
  - Real-time system health dashboards.
  - Audit logs and encryption event monitoring.
  - **No access** to actual customer data contents.

### Dashboard & UI
- **Responsive Design**: Built with a mobile-first approach using standard Tailwind CSS utility classes.
- **Interactive Elements**: Dynamic charts, real-time status indicators, and sleek data visualizations.
- **Modern Aesthetics**: A premium look and feel utilizing a professional color palette (Slate & Blue for Trust, Green for Status, Red for Critical Actions).

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first architecture)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Custom built UI components (Cards, Buttons, Inputs, etc.) for maximum control and performance.

## 📦 Installation

1. **Clone the repository** (or download the source):
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
src/
├── app/
│   ├── components/         # Feature-specific components
│   │   ├── ui/             # Reusable UI library (Button, Card, etc.)
│   │   ├── BankAdmin...    # Bank Admin flow components
│   │   ├── SystemAdmin...  # System Admin flow components
│   │   └── HomeScreen.jsx  # Landing/Role Selection screen
│   └── App.jsx             # Main application entry point
├── styles/
│   └── tailwind.css        # Tailwind directives
└── main.jsx                # React root rendering
```

## 🎨 Design System

The project originally used custom CSS variables but has been refactored to use **standard Tailwind CSS classes** for better maintainability and developer experience. 
- **Primary Actions**: `bg-slate-900`
- **Success States**: `bg-green-600` / `text-green-600`
- **Warnings/Critical**: `bg-red-600` / `text-red-600`
- **Neutrals**: Slate scale (`slate-100`, `slate-500`, etc.)

## 🔒 Security Simulation

*Note: This is a front-end simulation prototype.*
- **Encryption**: Visual cues represent AES-256 encryption.
- **Data Persistence**: Data changes are state-based within the session and do not persist to a real backend.
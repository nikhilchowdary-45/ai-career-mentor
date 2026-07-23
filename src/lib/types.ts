export interface UserSession {
  fullName: string;
  email: string;
  password?: string;
  githubId?: string;
  linkedinUrl?: string;
  profilePhotoUrl?: string | null;
  userRole?: "Student" | "Fresh Graduate" | "Working Professional" | "Career Switcher";
  targetRole?: string;
  studyPreference?: "Free YouTube & Open Source" | "Platform Paid Courses" | "Hybrid (Recommended)";
  dailyHours?: string;
  studyTimeOfDay?: string;
  registeredAt?: string;
  updatedAt?: string;
}

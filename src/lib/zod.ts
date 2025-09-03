import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom saisi est invalide")
      .max(50, "Le prénom saisi est invalide"),
    lastName: z
      .string()
      .min(2, "Le nom saisi est invalide")
      .max(50, "Le nom saisi est invalide"),
    email: z
      .string()
      .min(1, "L'adresse email est requise")
      .email("Adresse email invalide")
      .max(100, "L'adresse email est trop longue"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .max(64, "Le mot de passe est trop long"),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .max(64, "Le mot de passe est trop long"),
    confirmTerms: z
      .string()
      .nullable()
      .refine((val) => val === "on", {
        message: "Vous devez accepter les conditions d'utilisation",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "L'adresse e-mail ou le mot de passe est invalide")
    .email("L'adresse e-mail ou le mot de passe est invalide")
    .max(100, "L'adresse e-mail ou le mot de passe est invalide"),
  password: z
    .string()
    .min(1, "L'adresse e-mail ou le mot de passe est invalide")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
      "L'adresse e-mail ou le mot de passe est invalide"
    )
    .max(64, "L'adresse e-mail ou le mot de passe est invalide"),
});

export const updateUserSchema = z.object({
  lastName: z
    .string()
    .min(2, "Le nom saisi est invalide")
    .max(50, "Le nom saisi est invalide"),
  firstName: z
    .string()
    .min(2, "Le prénom saisi est invalide")
    .max(50, "Le prénom saisi est invalide"),
});

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom saisi est invalide")
    .max(50, "Le prénom saisi est invalide"),
  lastName: z
    .string()
    .min(2, "Le nom saisi est invalide")
    .max(50, "Le nom saisi est invalide"),
  email: z
    .string()
    .min(1, "L'adresse email est requise")
    .email("Adresse email invalide")
    .max(100, "L'adresse email est trop longue"),
  phone: z
    .string()
    .regex(/^0[1-9] \d{2} \d{2} \d{2} \d{2}$/, "Numéro de téléphone invalide")
    .length(14, "Le numéro doit contenir exactement 14 caractères"),
  subject: z
    .string()
    .min(1, "L'objet saisi est invalide")
    .max(105, "L'objet saisi est invalide"),
  message: z
    .string()
    .min(20, "Le message saisi est trop court (20 caractères min)")
    .max(3000, "Le message saisi est trop long (3000 caractères max)"),
  rgpd: z
    .string()
    .nullable()
    .refine((val) => val === "on", {
      message: "Vous devez accepter la politique de confidentialité",
    }),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "L'adresse email est requise")
    .email("Adresse email invalide")
    .max(100, "L'adresse email est trop longue"),
});

export const codeSchema = z.object({
  code: z.string().min(4, "Le code est invalide"),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .max(64, "Le mot de passe est trop long"),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .max(64, "Le mot de passe est trop long"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .max(64, "Le mot de passe est trop long"),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .max(64, "Le mot de passe est trop long"),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,64}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
      )
      .max(64, "Le mot de passe est trop long"),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

export const formationSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom saisi est invalide")
    .max(50, "Le prénom saisi est invalide"),
  lastName: z
    .string()
    .min(2, "Le nom saisi est invalide")
    .max(50, "Le nom saisi est invalide"),
  email: z
    .string()
    .min(1, "L'adresse email est requise")
    .email("Adresse email invalide")
    .max(100, "L'adresse email est trop longue"),
  phone: z
    .string()
    .regex(/^0[1-9] \d{2} \d{2} \d{2} \d{2}$/, "Numéro de téléphone invalide")
    .length(14, "Le numéro doit contenir exactement 14 caractères"),
  message: z
    .string()
    .min(20, "Le message saisi est trop court (20 caractères min)")
    .max(3000, "Le message saisi est trop long (3000 caractères max)"),
  rgpd: z
    .string()
    .nullable()
    .refine((val) => val === "on", {
      message: "Vous devez accepter la politique de confidentialité",
    }),
});

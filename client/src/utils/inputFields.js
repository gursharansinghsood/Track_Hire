import { BiShieldAlt } from "react-icons/bi";
import { FiUser, FiMail } from "react-icons/fi";


export const registerPage = [
    {
        name: "name",
        label: "NAME",
        type: "text",
        placeholder: "your name",
        setFocus: "email",
        icon: FiUser,
        validation: {
            required: "Name is required",
            minLength: {
                value: 3,
                message: "Minimum 3 characters required",
            },
            maxLength: {
                value: 20,
                message: "Maximum 20 characters allowed",
            },
            pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters and spaces are allowed",
            },
        },
    },
    {
        name: "email",
        label: "EMAIL",
        type: "email",
        placeholder: "you@gmail.com",
        setFocus: "password",
        icon: FiMail,
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
            },
        },
    },
    {
        name: "password",
        label: "PASSWORD",
        type: "password",
        placeholder: "*************",
        setFocus: null,
        validation: {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
            },
            maxLength: {
                value: 20,
                message: "Password cannot exceed 20 characters",
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/,
                message:
                    "Password must contain uppercase, lowercase, number and special character",
            },
        },
    },
];

export const otpPage = [
    {
        name: "otp",
        label: "Enter the 6-digit OTP sent to your email",
        type: "text",
        placeholder: "Enter the OTP",
        icon: BiShieldAlt,
        validation: {
            required: "Otp is required",
            minLength: {
                value: 6,
                message: "OTP must be 6 digits",
            },
            maxLength: {
                value: 6,
                message: "OTP must be 6 digits",
            },
            pattern: {
                value: /^\d{6}$/,
                message: "Only 6 digits are allowed",
            },
        }
    }
]

export const loginPage = [
    {
        name: "email",
        label: "EMAIL",
        type: "email",
        placeholder: "you@gmail.com",
        setFocus: "password",
        icon: FiMail,
        validation: { required: "Email is required", },
    },
    {
        name: "password",
        label: "PASSWORD",
        type: "password",
        placeholder: "*************",
        setFocus: null,
        validation: { required: "Password is required", },
    },
];

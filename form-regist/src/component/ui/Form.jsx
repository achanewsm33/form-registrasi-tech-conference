import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const validatePassword = (value) => {
  if (!value) return "Password harus 8+ karakter, mengandung angka & simbol";
  if (value.length < 8) return "Password harus 8+ karakter, mengandung angka & simbol";
  if (!/\d/.test(value)) return "Password harus 8+ karakter, mengandung angka & simbol";
  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/~`+=;:]/.test(value)) return "Password harus 8+ karakter, mengandung angka & simbol";
  return true;
};

const validateUrl = (value) => {
  if (!value || value.trim() === "") return true;
  try {
    const candidate = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
    new URL(candidate);
    return true;
  } catch {
    return "Format URL tidak valid";
  }
};

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // feedback state (hanya untuk menampilkan pesan sukses)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState("");

    const onSubmit = (data) => {
        // data adalah objek yang berisi semua field
        console.log("Submitted data:", data);

        // simpan nama untuk feedback dan tampilkan pesan sukses
        setSubmittedName(data.fullName);
        setIsSubmitted(true);

    // optional: reset form fields jika ingin mengosongkan input setelah submit
    // reset();
  };

  // efek untuk menghilangkan pesan sukses setelah 3 detik
    useEffect(() => {
        if (!isSubmitted) return;
        const t = setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedName("");
        }, 3000);

        return () => clearTimeout(t);
    }, [isSubmitted]);

    return(
        <div className="w-lg mx-auto p-6 bg-gray-300 text-black rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Registrasi Tech Conference</h2>

            {isSubmitted && (
                <div
                role="status"
                aria-live="polite"
                className="mb-4 p-3 bg-green-100 text-green-800 rounded"
                >
                Registrasi Berhasil, {submittedName}!
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-5 text-start w-full">
                {/* 1. Full Name */}
                <div>
                    <label htmlFor="fullName" className="block mb-1 text-left">Nama Lengkap</label>
                    <input
                    id="fullName"
                    type="text"
                    {...register("fullName", { required: "Nama lengkap wajib diisi" })}
                    className="w-full px-3 py-1 rounded bg-white"
                    />
                    {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Username */}
                <div>
                    <label htmlFor="username" className="block mb-1 text-left">Username</label>
                    <input
                    id="username"
                    type="text"
                    {...register("username", {
                    required: "Username wajib diisi",
                    minLength: { value: 6, message: "Username minimal 6 karakter" },
                    maxLength: { value: 20, message: "Username maksimal 20 karakter" },
                    })}
                    className="w-full px-3 py-1 rounded bg-white"
                />
                    {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-1 text-left">Email</label>
                    <input
                    id="email"
                    type="email"
                    {...register("email", {
                    required: "Email wajib diisi",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Format email tidak valid" },
                    })}
                    className="w-full px-3 py-1 rounded bg-white"
                />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 text-left">Password</label>
                    <input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password harus 8+ karakter, mengandung angka & simbol",
                      validate: validatePassword,
                    })}
                    className="w-full px-3 py-1 rounded bg-white"
                />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                {/* Age */}
                <div>
                    <label htmlFor="age" className="block mb-1 text-left">Umur</label>
                    <input
                    id="age"
                    type="number"
                    {...register("age", {
                        required: "Peserta harus berusia antara 18 dan 100 tahun",
                    valueAsNumber: true,
                    min: { value: 18, message: "Peserta harus berusia antara 18 dan 100 tahun" },
                    max: { value: 100, message: "Peserta harus berusia antara 18 dan 100 tahun" },
                     })}
                    className="w-full px-3 py-1 rounded bg-white"
                    />
                    {errors.age && <p className="text-sm text-red-600 mt-1">{errors.age.message}</p>}
                </div>

                <div>
                    <label htmlFor="websiteUrl" className="block mb-1">Situs Web Pribadi (opsional)</label>
                    <input
                        id="websiteUrl"
                        type="text"
                        placeholder="https://laman.com"
                        {...register("websiteUrl", { validate: validateUrl })}
                        className="w-full px-3 py-2 rounded bg-white"
                    />
                    {errors.websiteUrl && <p className="text-sm text-red-600 mt-1">{errors.websiteUrl.message}</p>}
                    </div>

                {/* Ticket Type */}
                <div>
                    <label htmlFor="ticketType" className="block mb-1 text-left">Tipe Tiket</label>
                    <select
                    id="ticketType"
                    {...register("ticketType", { required: "Anda harus memilih tipe tiket" })}
                    className="w-full px-3 py-1 rounded bg-white"
                    defaultValue=""
                    >
                    <option value="">-- Pilih Tipe Tiket --</option>
                    <option value="General Access">General Access</option>
                    <option value="VIP">VIP</option>
                    <option value="Student">Student</option>
                    </select>
                    {errors.ticketType && <p className="text-sm text-red-600 mt-1">{errors.ticketType.message}</p>}
                </div>
                
                {/* Agree to Terms */}
                <div className="flex items-start gap-2">
                    <input
                        id="agreeToTerms"
                        type="checkbox"
                        {...register("agreeToTerms", { required: "Anda harus menyetujui syarat dan ketentuan" })}
                        className="my-1"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm">
                        Saya setuju dengan syarat &amp; ketentuan
                    </label>
                </div>
                {errors.agreeToTerms && <p className="text-sm text-red-600 mt-1">{errors.agreeToTerms.message}</p>}

                <button type="submit" className="mt-2 px-4 py-2 bg-amber-400 rounded font-medium">
                Submit
                </button>

            </form>
        </div>
    );
}
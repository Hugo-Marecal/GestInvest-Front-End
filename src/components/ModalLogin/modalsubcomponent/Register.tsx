import React, { useCallback, useEffect, useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { register } from '../../API/authentificationRequest';

interface RegisterProps {
  email: string;
  password: string;
  closeModal: () => void;
}

function Register({ email, password: initialPassword, closeModal }: RegisterProps) {
  const [registerPassword, setRegisterPassword] = useState(initialPassword || '');
  const [inputconfirmation, setInputconfirmation] = useState('');
  const [registerEmail, setRegisterEmail] = useState(email || '');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validatePasswordRegex(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  const handlePasswordChange = useCallback((password: string) => {
    const isValid = validatePasswordRegex(password);
    setPasswordError(
      isValid
        ? null
        : 'Votre mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.',
    );
  }, []);

  const handleConfirmPasswordChange = useCallback(
    (confirmPassword: string) => {
      const isMatch = registerPassword === confirmPassword;
      setConfirmPasswordError(isMatch ? null : 'Les mots de passe ne correspondent pas.');
    },
    [registerPassword],
  );

  const enableSubmitButton = useCallback(() => {
    setIsSubmitDisabled(passwordError !== null || confirmPasswordError !== null);
  }, [passwordError, confirmPasswordError]);

  useEffect(() => {
    enableSubmitButton();
  }, [passwordError, confirmPasswordError, enableSubmitButton]);

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await register(registerEmail, registerPassword, inputconfirmation);
      closeModal();
      setRegisterEmail('');
      setRegisterPassword('');
      setInputconfirmation('');
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit} className="register">
      <div className="flex flex-col justify-center items-center py-4 ">
        <label className="pt-2 pb-2 text-white w-full  text-start" htmlFor="email">
          E-mail
        </label>
        <input
          className="appearance-none rounded-md p-1 w-full  bg-violet-300 focus:outline-none focus:ring-2 focus:ring-buttonColor placeholder-gray-900 placeholder-opacity-60"
          type="email"
          id="email"
          name="email"
          placeholder="js4Life@gmail.com"
          required
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />

        <label className="pt-4 pb-2 text-white w-full  text-start" htmlFor="password">
          Mot de passe
        </label>
        <div className="relative w-full">
          <input
            className="rounded-md p-1 w-full  bg-violet-300 focus:outline-none focus:ring-2 focus:ring-buttonColor placeholder-gray-900 placeholder-opacity-60"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="*********"
            required
            value={registerPassword}
            autoComplete="new-password"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
              handlePasswordChange(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            {showPassword ? (
              <LuEyeOff className="text-gray-500" size={20} />
            ) : (
              <LuEye className="text-gray-500" size={20} />
            )}
          </button>
        </div>
        {passwordError && <p className="error-message text-red-600 pt-4 text-xs xl:text-sm">{passwordError}</p>}

        <label className="pt-4 pb-2 text-white w-full  text-start " htmlFor="confirm-password">
          Confirmation du mot de passe
        </label>
        <div className="relative w-full">
          <input
            className="rounded-md p-1 w-full bg-violet-300 focus:outline-none focus:ring-2 focus:ring-buttonColor placeholder-gray-900 placeholder-opacity-60"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirm-password"
            onChange={(e) => {
              setInputconfirmation(e.target.value);
              handleConfirmPasswordChange(e.target.value);
            }}
            placeholder="*********"
            required
            autoComplete="new-password"
            value={inputconfirmation}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
          >
            {showConfirmPassword ? (
              <LuEyeOff className="text-gray-500" size={20} />
            ) : (
              <LuEye className="text-gray-500" size={20} />
            )}
          </button>
        </div>
        {confirmPasswordError && (
          <p className="error-message  text-red-600 pt-4 text-xs xl:text-sm">{confirmPasswordError}</p>
        )}

        <button
          className="w-2/4 valid-button p-2 mt-8 hover:bg-custom-purple text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
          type="submit"
          disabled={isSubmitDisabled}
        >
          S&apos;inscrire
        </button>
      </div>
    </form>
  );
}

export default Register;

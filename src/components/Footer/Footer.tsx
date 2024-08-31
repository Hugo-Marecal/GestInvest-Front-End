function Footer() {
  return (
    <footer className="w-full bottom-0 flex justify-around items-center h-[6vh] bg-[#101010]  text-xs sm:text-sm">
      <p className="text-center flex">
        © 2024 Gestinvest.
        <span className="hidden md:block">All rights reserved.</span>
      </p>
      <a
        href="/politique-de-confidentialite"
        className="my-auto text-white hover:underline underline-offset-4 cursor-pointer"
      >
        Politique de confidentialité
      </a>
      <a href="/condition-utilisation" className="my-auto text-white hover:underline underline-offset-4 cursor-pointer">
        Conditions d&apos;utilisation
      </a>
    </footer>
  );
}

export default Footer;

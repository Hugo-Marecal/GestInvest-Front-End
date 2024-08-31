import { Helmet } from 'react-helmet-async';

function Condition() {
  return (
    <>
      <Helmet>
        <title>GestInvest - Conditions d'utilisation</title>
        <meta
          name="description"
          content="Les conditions d'utilisation définissent les règles et les obligations pour utiliser notre plateforme. Veuillez les lire attentivement."
        />
      </Helmet>
      <div className="text-left m-auto w-3/4 border rounded-lg px-3 pb-5 my-10 md:px-10 md:pb-10 md:my-12 md:w-3/4 lg:w-1/2  text-sm lg:text-base">
        <h1 className="text-center md:text-left my-5 text-xl sm:text-2xl lg:text-center lg:text-4xl lg:my-8 text-violet-300">
          Conditions d&apos;utilisation de Gestinvest
        </h1>
        <p className="my-4 lg:my-8">
          Dernière mise à jour : 09/04/2024 <br />
          <br />
          Gestinvest s&apos;engage à protéger la confidentialité de ses utilisateurs.
        </p>
        <div>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            1.Utilisation autorisée
          </h2>
          <p className="font-light mb-2">
            Le Service est destiné uniquement au suivi d&apos;actifs et à la gestion de portfolios. Aucune
            fonctionnalité d&apos;achat ou de vente n&apos;est disponible.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            2.Sécurité
          </h2>
          <p>
            Nous prenons des mesures de sécurité appropriées pour protéger les informations des utilisateurs. Cela
            inclut l&apos;utilisation de technologies de cryptage et de sécurisation des données.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            3.Propriété
          </h2>
          <p>
            Tous les droits de propriété sur le Service, y compris mais sans s&apos;y limiter, les droits d&apos;auteur,
            les marques de commerce et autres droits de propriété intellectuelle, appartiennent à Gestinvest.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            4.Responsabilité
          </h2>
          <p>
            Gestinvest n&apos;est en aucun cas responsable des pertes ou gains réalisés par les utilisateurs en
            utilisant le Service. Les décisions d&apos;investissement prises par les utilisateurs sont de leur entière
            responsabilité.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            5.Aucune garantie
          </h2>
          <p>
            Nous garantissons que les informations fournies par le Service seront exactes et actualisées deux fois par
            jour, à 12h00 et à 00h00. Cependant, nous déclinons toute responsabilité quant à l&apos;utilisation que les
            utilisateurs font des données fournies. Les utilisateurs utilisent le Service à leurs propres risques.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            6.Modifications des conditions d&apos;utilisation
          </h2>{' '}
          <p>
            Nous nous réservons le droit de modifier ces conditions d&apos;utilisation à tout moment. Les utilisateurs
            seront informés de ces modifications par le biais de notifications dans l&apos;application ou par e-mail.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            7.Coordonnées
          </h2>
          <p>
            Pour toute question ou préoccupation concernant les conditions d&apos;utilisation, veuillez nous contacter à
            l&apos;adresse e-mail suivante : <a href="mailto:gestinvest@gmail.com">gestinvest@gmail.com</a>
          </p>
          <p>En utilisant le Service, vous acceptez pleinement et sans réserve ces conditions d&apos;utilisation.</p>
        </div>
      </div>
    </>
  );
}

export default Condition;

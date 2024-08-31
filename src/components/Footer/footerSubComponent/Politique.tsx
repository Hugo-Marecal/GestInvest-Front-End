import { Helmet } from 'react-helmet-async';

function Politique() {
  return (
    <>
      <Helmet>
        <title>GestInvest - Politique de confidentialité</title>
        <meta
          name="description"
          content="Consultez notre politique de confidentialité pour comprendre comment nous recueillons, utilisons et protégeons vos données personnelles."
        />
      </Helmet>
      <div className="text-left m-auto w-3/4 border rounded-lg px-3 pb-5 my-10 md:px-10 md:pb-10 md:my-12 md:w-3/4 lg:w-1/2  text-sm lg:text-base">
        <h1 className="text-center md:text-left my-5 text-xl sm:text-2xl lg:text-center lg:text-4xl lg:my-8 text-violet-300">
          Politique de confidentialité de Gestinvest
        </h1>
        <p className="my-4 lg:my-8">
          Dernière mise à jour : 09/04/2024 <br />
          <br />
          Gestinvest s&apos;engage à protéger la confidentialité de ses utilisateurs.
          <br />
          <br />
          Cette politique de confidentialité décrit les types d&apos;informations que nous collectons, comment nous les
          utilisons et les protégeons.
        </p>
        <div>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            1. Informations collectées
          </h2>
          <p className="font-light mb-2">Nous collectons les informations suivantes :</p>
          <ul className="text-sm lg:text-base">
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse e-mail</li>
            <li>Données financières (telles que les investissements en cryptomonnaies et en actions)</li>
          </ul>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            2.Méthodes de collecte
          </h2>
          <p>
            Toutes les informations sont saisies manuellement par les utilisateurs dans l&apos;application Gestinvest.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            3.Utilisation des informations
          </h2>
          <p>
            Nous utilisons les informations collectées uniquement pour fournir les fonctionnalités de notre application.
            Ces informations ne sont pas utilisées à des fins de marketing ou de recherche.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            4.Partage d&apos;informations
          </h2>
          <p>Nous ne partageons aucune information avec des tiers.</p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            5.Sécurité des données
          </h2>
          <p>
            Toutes les données sont protégées grâce à une gestion des tokens JWT (JSON Web Tokens) pour assurer la
            sécurité des informations des utilisateurs.
          </p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            6.Cookies et technologies similaires
          </h2>{' '}
          <p>Notre application n&apos;utilise pas de cookies ni de technologies similaires.</p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            7.Droits des utilisateurs
          </h2>
          <p>Les utilisateurs ont le droit de modifier ou de supprimer leurs données personnelles à tout moment.</p>
          <h2 className="my-4 font-bold tracking-normal md:text-base text-base lg:text-2xl text-violet-200">
            8.Coordonnées
          </h2>
          <p>
            Pour toute question ou préoccupation concernant notre politique de confidentialité, veuillez nous contacter
            à l&apos;adresse e-mail suivante : gestinvest@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}

export default Politique;

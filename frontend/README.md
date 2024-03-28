# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


============ Frontend ========================

cet fichier est pour le but de me rafraichir la memoire sur l'usage de certain features frontend tel que 
* la Router-dom 
* la router-bootstrap

dans le dossier component se trouve deux fichier les header et le page heroSection:
 * le fichier header permet de definir la bar de navigation de l'application, avec l'utilisation de certain elements telle que : 
    Container, Navbar, Nav qui viennent du package react-bootstrap est permet de structurer la bar de navigation de l'application.
    LinkContainer permet de structure l'application en SPA qui provient du package react-router-bootstrap en evitant le chargement de la page a nouveau a chaque navigation.
 * le fichier HeroSection contient juste une petite illustration 

le dossier screen contient HomeScreen est un fichier simple qui ne contient rien d'etrange juste du fichier heroSection

le fichier LoginScreen est un fichier du login de l'utilisateur en appelant le fichier FormContainer.

le fichier main contient certain definition de routage de page...
le fichier FormContainer contient juste un boilerplate pour toute les form de l'application qui seront passée comme children, c'est qui est une bonne pratique


installer le package @reduxjs/toolkit et react-redux && le slice c'est ou on peu garder certain partie du  state

le dossier slice contient le fichier authSlice qui contient une fonction nommer initialState qui verifie la localStorage et parse son contenu en javascript

* le fichier apiSlice contient certaine configuration pour la connexion a la base de donnée avec une best practice: 
   la fonction baseQuery => fait appel a l'api avec la fonction predef fetchBaseQuery qui prend un objet en parametre et la baseUrl est vide car nous utilisons le proxy dans la configuration du fichier vite.config.js sinon pas nous aurions pu y ecrire http://localhost:5000

   la fonction apiSlice cree la connexion en utilisant la createApi mais aussi le tagTypes peu contenir tout c'est qui sera exploiter cote backend pour notre cas il s'agit uniquement de l'utilisateur qui peut-etre considere comme le parent de tout les apispour les requetes vers la base de donnée.
   apiSlice renvois un certain nombre de methode telque :
      *queries: pour avoir les elements dans la base de donnée
      *mitations: pour modifier dans la base de donnée

   le fichier userslice est un fichier composer de :
      une var qui contient le chemin de l'api qui est '/api/users/'
      une fonction userApiSlice qui permet de creer notre propre endpoint et qui sera injecter dans l'apiSlice a la fonction endpoints qui recois un builder,

      userApiSlice : permet d'effectuer une requet http vers le server enfin d'authentifier un utilisateur à partir de la method mutation

      export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            }),
        })
    })
   }) : pour fetch certain donnée de la base de données nous allons utilisé la methode query a la place de la mutation et la fonction sera exporter en utilisant use...Query au lieu du use...Mutation


   loginScreen :
    * const [login, {isLoading}] = useLoginMutation(); : une fonction qui permet de contenir le nom  definissant la fonction useLoginMutation login et isloading est une fonction predef

    useEffect({
        if(userInfo){
            navigate('/'); : redirect to home screen
        }
    },[navigate, userInfo]); : verification de l'utilisateur s'il est authentifier alors on passe a la page d'accueil


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap(); : execution de cette methode => login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            }) pour se connecter a la bd
            dispatch(setCredentials({...res}));: placer les informations de connexion dans le locationStorage
            navigate('/'): et la connexion a la page d'acceuille
        } catch (error) {
            
        }
    }

    installer react-toastify pour le pop up de connexion ou de formulaire invalide


    useSelector permet  de verifier l'auth du user et de selectionné les info dans la localStorage

     const logoutHandler = async() =>{
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    } : cette fonction permet la deconnexion d'un utilisateur en detruisant son token dans le localStorage.

    le loader file :
        contient juste un spinner qui charge la page lors que on essaie de se connecter
    

le fiechier profilescreen est un fichier qui permet a un utilisateur de modifier son profile
le fichier privaterouter est un fichier de verifiacation ou d'authentification pour utilisateur ayant ete connecter ou pas 
on peu utiliser cette sequence pour les administrateur d'un site,
pour se faire il suffit de verifier le chemin en enveloppant cela par une route private 
telque fais dans le fichier main


=======fin du frontend =======
quelque details utile pour passer au deployement :
    * il faut excuter le build du frontend avec la cmd : npm run build
    qui va generer un fichier dist: qui va generer un fichier static qui sera notre point d'etre
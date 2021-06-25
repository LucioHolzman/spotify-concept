import '../styles/globals.css'
import {ContextProvider} from '../context'
import { Provider } from "next-auth/client"

function MyApp({ Component, pageProps }) {
  return (
  <>
  <ContextProvider>
  {/* <Provider session={pageProps.session}> */}
    <Component {...pageProps} />
  {/* </Provider> */}
  </ContextProvider>

  </>
  )
}

// function Auth({ children }) {
//   const [session, loading] = useSession()
//   const isUser = !!session?.user
//   React.useEffect(() => {
//     if (loading) return // Do nothing while loading
//     if (!isUser) signIn() // If not authenticated, force log in
//   }, [isUser, loading])

//   if (isUser) {
//     return children
//   }

//   // Session is being fetched, or no user.
//   // If no user, useEffect() will redirect.
//   return <div>Loading...</div>
// }

export default MyApp

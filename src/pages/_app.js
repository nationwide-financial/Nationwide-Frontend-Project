import "@fontsource/montserrat";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/variable.css";
import "../styles/globals.css";
import AdminLayout from "../Layouts/AdminLayout";
import NormalLayout from "../Layouts/NormalLayout";
import { Provider } from "../context";

const layouts = {
  AdminLayout: AdminLayout,
  NormalLayout: NormalLayout,
};

function App({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;

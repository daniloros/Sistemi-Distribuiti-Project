import "../styles/globals.css";

import { ChatAppProvider } from "../Context/ChatAppContext";


const MyApp = ({ Component, pageProps }) => (
  <div>
      <ChatAppProvider>
          <Component {... pageProps} />
      </ChatAppProvider>
  </div>
);

export default MyApp;
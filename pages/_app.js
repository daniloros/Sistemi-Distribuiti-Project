import "../styles/globals.css";

import { ChatAppProvider } from "../Context/ChatAppContext";
import {NavBar} from "@/Components";


const MyApp = ({ Component, pageProps }) => (
  <div>
      <ChatAppProvider>
          <NavBar/>
          <Component {... pageProps} />
      </ChatAppProvider>
  </div>
);

export default MyApp;
import Footer from "./components/footer";
import { Outlet } from "react-router";
import Header from "./components/header";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Header />
      <div className="bg-muted min-h-svh border-b">
        <Outlet />
      </div>
      <Footer />
    </Provider>
  );
}

import { type Dispatch, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { NavigationLink } from "elements/NavigationLink";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setTheme } from "store/themeSlice";
import { setUser, TUserState } from "store/userSlice";
import { setWallet } from "store/walletSlice";
import { pages } from "components/Router";
import { Modal } from "components/Modal/Modal";
import { LogForm } from "elements/LogForm";
import { RegForm } from "elements/RegForm";
import { useLocalStorage } from "hooks/useLocalStorage";


export function Navbar() {
  const dispatch = useAppDispatch();
  const [, setStorageTheme] = useLocalStorage("theme");
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = useAppSelector((state) => state.user);
  const theme = useAppSelector((state) => state.theme);
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="/">
            <div className="logo"></div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {getLinks(user)}
            </ul>
            {getButtons(dispatch, user, setShowRegister, setShowLogin)}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="switchCheckChecked"
                onInput={() => {

                  dispatch(setTheme(theme === "dark" ? "light" : "dark"));
                  setStorageTheme(theme === "dark" ? "light" : "dark");
                }} 
              />
              <label className="form-check-label" htmlFor="switchCheckChecked">Theme</label>
            </div>
          </div>
        </div>
      </nav>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <LogForm onClose={() => setShowLogin(false)} />
        </Modal>
      )}
      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <RegForm onClose={() => setShowRegister(false)} />
        </Modal>
      )}
    </>
  );
}

function getLinks(user: TUserState) {
  const baseLinks = [
    <NavigationLink linkData={pages.HOME} key={0}/>,
    <NavigationLink linkData={pages.ABOUT} key={1}/>,
    <NavigationLink linkData={pages.CONTACTS} key={2}/>,
    <NavigationLink linkData={pages.MARKET} key={3}/>,
  ];
  if(user) baseLinks.push(<NavigationLink linkData={pages.CABINET} key={4}/>, <NavigationLink linkData={pages.GAMES} key={5}/>);
  if(user?.permission.users) baseLinks.push(<NavigationLink linkData={pages.USERSADMIN} key={6}/>);
  if(user?.permission.wallets) baseLinks.push(<NavigationLink linkData={pages.WALLETSADMIN} key={7}/>);
  if(user?.permission.games) baseLinks.push(<NavigationLink linkData={pages.GAMESADMIN} key={8}/>);
  return baseLinks;
}

function logout (dispatch: Dispatch<unknown>) {
  dispatch(setUser(null));
  dispatch(setWallet({}));
}

function getButtons(dispatch: Dispatch<unknown>, user: TUserState, setShowRegister: (set: boolean) => void, setShowLogin: (set: boolean) => void) {
  if (user) {
    return (
      <>
        <div className="m-2 user">
          {user.name.charAt(0).toLocaleUpperCase()}
        </div>
        <button className="btn btn-outline-warning m-2" onClick={() => logout(dispatch)}>Logout</button>
      </>
    );
  }
  return (
    <>
      <button className="btn btn-outline-success m-2" onClick={() => setShowLogin(true)}>Login</button>
      <button className="btn btn-outline-info m-2" onClick={() => setShowRegister(true)}>Register</button>
    </>
  )
}

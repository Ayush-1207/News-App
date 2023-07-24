import React from "react";

import { connect } from "react-redux";
import classes from "./MainApp.module.css";

import NavItem from "components/UI/NavItem/NavItem";

import { Route } from "react-router-dom";
import HackerNews from "../HackerNews/HackerNews";
import { Dimmer, Loader } from "semantic-ui-react";
import * as navPathConstants from "./pathConstants";

import AskHN from "../HackerNews/AskHN/AskHN";
import CommentsLatest from "../HackerNews/CommentsLatest/CommentsLatest";
import Jobs from "../HackerNews/Jobs/Jobs";
import NewestNews from "../HackerNews/NewestNews/NewestNews";
import PastNews from "../HackerNews/PastNews/PastNews";
import ShowHN from "../HackerNews/ShowHN/ShowHN";
import Submit from "../HackerNews/User/Submit/Submit";
import Threads from "../HackerNews/User/Threads/Threads";

import Auth from "../Auth/Auth";
import * as authActions from "store/actions/AuthAction/AuthAction";
import { Icon } from "semantic-ui-react";
import UserProfile from "containers/HackerNews/User/UserProfile/UserProfile";
import HackerNewsItem from "containers/HackerNews/HackerNewsItem/HackerNewsItem";
import AddCommentTo from "components/UI/AddCommentTo/AddCommentTo";
import Thread from "containers/HackerNews/Thread/Thread";

class MainApp extends React.Component {
  render() {
    const isAuth = this.props.isAuth;
    const authLabel = isAuth ? "logout" : "login";

    if (isAuth && this.props.user == null) {
      this.props.loadUserData(this.props.userID);
    }

    const username = this.props.user ? this.props.user.username : "";

    let loginComp = (
      <Dimmer active>
        <Loader active inline />
      </Dimmer>
    );

    if (this.props.isAuth) {
      if (this.props.user) {
        const karma = this.props.user.karma;

        loginComp = (
          <>
            <a href={`/users/${username}`}>{`${username} (${karma})`}</a>
            <button
              className={classes.ButtonAsLink}
              onClick={this.props.onLogout}
            >
              {authLabel}
            </button>
          </>
        );
      }
    } else {
      loginComp = <NavItem label={authLabel} to={navPathConstants.login} />;
    }

    return (
      <div className={classes.HomePage}>
        <header>
          <nav className={classes.Navigation}>
            <ul className={classes.topicsNav}>
              <Icon
                name="hacker news"
                size="big"
                className={classes.logo}
                onClick={() => {}}
              />
              <NavItem label="new" to={navPathConstants.newest} />

              <NavItem
                label="threads"
                to={navPathConstants.threads}
                hide={!isAuth}
              />

              <NavItem label="past" to={navPathConstants.past} />
              <NavItem label="comments" to={navPathConstants.newcomments} />
              <NavItem label="ask" to={navPathConstants.ask} />
              <NavItem label="show" to={navPathConstants.show} />
              <NavItem label="jobs" to={navPathConstants.jobs} />

              <NavItem label="submit" to={navPathConstants.submit} />
            </ul>

            <ul className={classes.userNav}>{loginComp}</ul>
          </nav>
        </header>

        <main>
          <Route path={navPathConstants.newest} exact component={NewestNews} />
          <Route path={navPathConstants.threads} exact component={Threads} />
          <Route path={navPathConstants.past} exact component={PastNews} />
          <Route
            path={navPathConstants.newcomments}
            exact
            component={CommentsLatest}
          />
          <Route path={navPathConstants.ask} exact component={AskHN} />

          <Route path={navPathConstants.show} exact component={ShowHN} />
          <Route path={navPathConstants.jobs} exact component={Jobs} />

          <Route path={navPathConstants.submit} exact component={Submit} />
          <Route path={navPathConstants.login} exact component={Auth} />
          <Route path="/" exact component={HackerNews} />
          <Route
            path={navPathConstants.singlePost}
            exact
            component={HackerNewsItem}
          />
          <Route
            path={navPathConstants.singleUser}
            exact
            component={UserProfile}
          />

          <Route path={navPathConstants.reply} exact component={AddCommentTo} />
          <Route
            path={navPathConstants.commentThread}
            exact
            component={Thread}
          />
        </main>

        <footer className={classes.footer}>
          <ul className={classes.footerNav}>
            <li> Guidelines </li>
            <li> FAQ </li>
            <li> Lists </li>
            <li> API </li>
            <li> Security </li>
            <li> Legal </li>
            <li> Apply to YC </li>
            <li> Contact </li>
          </ul>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    userID: state.auth.userID,
    user: state.auth.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authActions.tryLogout()),
    loadUserData: (userID) => dispatch(authActions.tryStoreUserData(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);

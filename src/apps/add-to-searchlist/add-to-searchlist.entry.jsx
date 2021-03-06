import React, { useState } from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";

import AddToSearchlist from "./add-to-searchlist";
import FollowSearches from "../../core/FollowSearches";

function AddToSearchlistEntry({
  followSearchesUrl,
  searchQuery,
  buttonText,
  labelText,
  defaultTitle,
  helpText,
  successText,
  successLinkUrl,
  successLinkText,
  errorText,
  addButtonText,
  errorRequiredMessage,
  errorMaxLengthMessage,
  loginUrl
}) {
  const [status, setStatus] = useState("ready");

  function setListRestoreStatus() {
    setStatus("ready");
  }

  function setListErrorStatus() {
    setStatus("failed");
    setTimeout(setListRestoreStatus, 2000);
  }

  function setListSuccessStatus() {
    setTimeout(setListRestoreStatus, 10000);
  }

  function addToSearchList(title) {
    setStatus("processing");

    const client = new FollowSearches({ baseUrl: followSearchesUrl });
    client
      .addSearch({ title, query: searchQuery })
      .then(setListSuccessStatus)
      .catch(setListErrorStatus);
  }
  return (
    <AddToSearchlist
      status={status}
      onSubmit={addToSearchList}
      searchQuery={searchQuery}
      buttonText={buttonText}
      labelText={labelText}
      defaultTitle={defaultTitle}
      errorText={errorText}
      successText={successText}
      successLinkUrl={successLinkUrl}
      successLinkText={successLinkText}
      addButtonText={addButtonText}
      helpText={helpText}
      errorRequiredMessage={errorRequiredMessage}
      errorMaxLengthMessage={errorMaxLengthMessage}
      loginUrl={loginUrl}
    />
  );
}

AddToSearchlistEntry.propTypes = {
  followSearchesUrl: urlPropType,
  buttonText: PropTypes.string,
  errorText: PropTypes.string,
  successText: PropTypes.string,
  successLinkUrl: urlPropType,
  successLinkText: PropTypes.string,
  labelText: PropTypes.string,
  addButtonText: PropTypes.string,
  defaultTitle: PropTypes.string,
  errorRequiredMessage: PropTypes.string,
  errorMaxLengthMessage: PropTypes.string,
  helpText: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  loginUrl: urlPropType.isRequired
};

AddToSearchlistEntry.defaultProps = {
  followSearchesUrl: "https://stage.followsearches.dandigbib.org",
  buttonText: "Tilf??j til mine s??gninger",
  labelText: "S??getitel",
  errorText: "Noget gik galt",
  successText: "Tilf??jet til dine gemte s??gninger.",
  successLinkUrl: undefined,
  successLinkText: "Se dine gemte s??gnigner.",
  errorRequiredMessage: "En titel er p??kr??vet.",
  errorMaxLengthMessage: "Titlen m?? ikke v??re l??ngere end 255 tegn.",
  addButtonText: "Gem",
  defaultTitle: "",
  helpText:
    "Gem en s??gning her og giv den en titel s?? du nemt kan kende forskel p?? alle dine mange gemte s??gninger."
};

export default AddToSearchlistEntry;

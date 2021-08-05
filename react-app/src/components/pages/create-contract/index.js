import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import { CreateContractForm } from "../../containers/create-contract-form";
import { Session } from "../../../state/utils/session";
import { hiring_proccess_img } from "constants/external_assets_by_lang";
import { withRouter } from "next/router";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";
import { getCelebrityContractPrice } from "lib/utils/celebrityUtils";
import { analytics } from "react-app/src/state/utils/gtm";

class CreateContractPage extends Component {
  componentDidMount() {
    const { celebrity } = this.props;
    const user = new Session().getSession();
    analytics.track("CREATE_CONTRACT_PAGE_VIEW", { celebrity, user });
  }

  static defaultProps = {
    celebrity: {},
  };

  render() {
    const { router } = this.props;
    return (
      <>
        <PageContainer
          showFooter={false}
          showLogin={false}
          showSearch={false}
          fetchCelebrities={false}
          hideControls={true}
        >
          <div className={"CreateContractPage row mx-auto my-auto"}>
            <div className={"col-sm-12 col-lg-6 mx-auto my-auto p-0 m-0"}>
              <CreateContractForm
                contractPrice={getCelebrityContractPrice(this.props.celebrity)}
                celebrityId={this.props.celebrity.id}
                celebrityFullName={this.props.celebrity.fullName}
                celebrityUsername={this.props.celebrity.username}
                celebrityAvatar={this.props.celebrity.avatar}
              />
            </div>
            <div
              className={"col-sm-12 col-md-6 col-lg-6 mx-auto p-4 text-center"}
            >
              <div className={"steps-image ml-2 mb-2 mx-auto my-auto"}>
                <div className={"text-left"}>
                  <i
                    className={"ml-2 fas fa-question-circle"}
                    style={{ fontSize: "20px" }}
                  />
                </div>
                <img
                  width="100%"
                  className={"create-contract-steps"}
                  src={
                    hiring_proccess_img[
                      transformUserNavigatorLanguageToISO2Code(router.locale)
                    ]
                  }
                  alt={"create-contract-steps"}
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </>
    );
  }
}

const _CreateContractPage = withRouter(CreateContractPage);

export { _CreateContractPage as CreateContractPage };

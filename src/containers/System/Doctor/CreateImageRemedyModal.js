import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CreateImageRemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { CommonUtils } from "../../../utils";

class CreateImageRemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      //   imgBase64: "",
      listMedicine: "",
      desciption: "",
      patientName: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModalCreateRemedy) {
      this.setState({
        email: this.props.dataModalCreateRemedy.email,
        patientName: this.props.dataModalCreateRemedy.patientName,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModalCreateRemedy !== prevProps.dataModalCreateRemedy) {
      this.setState({
        email: this.props.dataModalCreateRemedy.email,
        patientName: this.props.dataModalCreateRemedy.patientName,
      });
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangeListMedicine = (event) => {
    this.setState({
      listMedicine: event.target.value,
    });
  };
  handleOnChangeDescription = (event) => {
    this.setState({
      desciption: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleCreateRemedyImage = () => {
    this.props.createRemedyImage(this.state);
  };

  render() {
    let {
      isOpenCreateImageRemedyModal,
      closeCreateImageRemedyModal,
      dataModalCreateRemedy,
      createRemedyImage,
    } = this.props;

    return (
      <Modal
        isOpen={isOpenCreateImageRemedyModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">T???o ????n thu???c</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeCreateImageRemedyModal}
          >
            <span aria-hidden="true">??</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email b???nh nh??n</label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                // onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>T??n b???nh nh??n</label>
              <input
                className="form-control"
                type="text"
                value={this.state.patientName}
                // onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Danh s??ch c??c lo???i thu???c</label>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={this.state.listMedicine}
                onChange={(event) => this.handleOnChangeListMedicine(event)}
              ></textarea>
            </div>
            <div className="col-12 form-group">
              <label>Th??ng tin m?? t??? c??ch u???ng thu???c</label>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={this.state.desciption}
                onChange={(event) => this.handleOnChangeDescription(event)}
              ></textarea>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.handleCreateRemedyImage()}
          >
            Create
          </Button>{" "}
          <Button color="secondary" onClick={closeCreateImageRemedyModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateImageRemedyModal);

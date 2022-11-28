import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSV: {},
            disabledAdd: false,
            disabledAddInput: true,
            displayUpdate: false,
            err: {}
        };
    }

    validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    onChange = (e) => {
        e.preventDefault();
        const newSV = this.state.newSV;
        newSV[e.target.id] = e.target.value;
        this.setState({ ...this.state, newSV });
        let err = { ...this.state.err };
        if (!newSV[e.target.id].trim()) {
            err[e.target.id] = "Không được để trống.";
        }
        else if (e.target.id === "email") {
            if (!this.validateEmail(e.target.value)) {
                err[e.target.id] = "Email không đúng định dạng.";
            } else {
                err[e.target.id] = "";
            }
        }
        else if (e.target.id === "sdt") {
            if (!e.target.value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
                err[e.target.id] = "SĐT không đúng định dạng.";
            }
            else {
                err[e.target.id] = "";
            }
        }
        else err[e.target.id] = "";
        let disabledAddInput = false;
        for (e in err) {
            if (err[e]) {
                disabledAddInput = true;
            }
        }
        this.setState({ ...this.state, err, disabledAddInput });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const eles = e.target.querySelectorAll('input');
        let formValue = {};
        for (let ele of eles) {
            formValue[ele.id] = ele.value;
        }
        const action = {
            type: 'THEM_SINH_VIEN',
            payload: { ...formValue }
        }

        for (let ele of eles) {
            ele.value = ''
        }

        this.props.dispatch(action);
    }
    handleUpdate = (e) => {
        e.preventDefault();
        const eles = document.querySelectorAll('#form input');
        let formValue = {};
        for (let ele of eles) {
            formValue[ele.id] = ele.value;
        }
        console.log(formValue);
        const action = {
            type: 'SUA_SINH_VIEN',
            payload: { ...formValue }
        }

        for (let ele of eles) {
            ele.value = ''
        }

        this.setState({
            newSV: null,
            disabledAdd: false,
            displayUpdate: false
        });

        this.props.dispatch(action);
    }
    render() {
        return (
            <div className='container' id='form'>
                <div className='card'>
                    <div className='card-header bg-dark text-white'>Thông tin sinh viên</div>
                    <div className='card-body'>
                        <form className='row' onSubmit={this.handleSubmit}>
                            <div className='col-6'>
                                <label htmlFor='maSV'>Mã SV</label><br />
                                <input id='maSV' name='maSV' style={{ width: '100%' }} disabled={this.state.disabledAdd} value={this.state.newSV?.maSV} onChange={this.onChange} />
                                <i className='error' id='maSVError'>{this.state.err['maSV']}</i>
                            </div>
                            <div className='col-6'>
                                <label htmlFor='hoTen'>Họ tên</label><br />
                                <input id='hoTen' name='hoTen' style={{ width: '100%' }} value={this.state.newSV?.hoTen} onChange={this.onChange} />
                                <i className='error' id='hoTenError'>{this.state.err['hoTen']}</i>
                            </div>
                            <div className='col-6 mt-2'>
                                <label htmlFor='sdt'>Số ĐT</label><br />
                                <input id='sdt' name='sdt' style={{ width: '100%' }} value={this.state.newSV?.sdt} onChange={this.onChange} />
                                <i className='error' id='sdtError'>{this.state.err['sdt']}</i>
                            </div>
                            <div className='col-6 mt-2'>
                                <label htmlFor='email'>Email</label><br />
                                <input id='email' name='email' style={{ width: '100%' }} value={this.state.newSV?.email} onChange={this.onChange} />
                                <i className='error' id='emailError'>{this.state.err['email']}</i>
                            </div>
                            <div className='col-6 mt-2'>
                                <button className='btn btn-success mr-2' type='submit' disabled={this.state.disabledAdd || this.state.disabledAddInput}>Thêm sinh viên</button>
                                {this.state.displayUpdate && <button className='btn btn-primary' onClick={this.handleUpdate}> Cập nhật</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.suaSinhVienMaSV !== this.props.suaSinhVienMaSV) {
            const sv = this.props.arrSinhVien.filter(item => item.maSV === this.props.suaSinhVienMaSV)[0];
            this.setState({
                newSV: { ...sv },
                disabledAdd: true,
                displayUpdate: true
            })
        }
    }
}

const mapStateToProps = (state) => ({
    suaSinhVienMaSV: state.suaSinhVienMaSV,
    arrSinhVien: state.arrSinhVien
})

const ReactFormHOC = connect(mapStateToProps)(ReactForm);

export default ReactFormHOC;

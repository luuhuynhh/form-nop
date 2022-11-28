import React, { Component } from 'react'
import { connect } from 'react-redux'

class ReactTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.arrSinhVien };
    }

    static getDerivedStateFromProps(newProps) {
        const arrSinhVienFilter = newProps.arrSinhVienFilter;
        const arrSinhVien = newProps.arrSinhVien;
        return { data: arrSinhVien.filter(item => item.hoTen.toLowerCase().includes(arrSinhVienFilter)) };
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    handleDelete = (maSV) => {
        const action = {
            type: 'XOA_SINH_VIEN',
            payload: maSV
        }

        this.props.dispatch(action);
    }
    handleUpdate = (maSV) => {
        const action = {
            type: 'THONG_TIN_SINH_VIEN',
            payload: maSV
        }

        this.props.dispatch(action);
    }
    render() {
        return (
            <div className='container'>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Mã sinh viên</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {this.state.data.map((sv, index) => (
                            <tr key={index}>
                                <td>{sv.maSV}</td>
                                <td>{sv.hoTen}</td>
                                <td>{sv.sdt}</td>
                                <td>{sv.email}</td>
                                <td className='p-1'>
                                    <button className='btn btn-success mr-2' onClick={() => { this.handleUpdate(sv.maSV) }}>Sửa</button>
                                    <button className='btn btn-danger' onClick={() => { this.handleDelete(sv.maSV) }}>Xóa</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    arrSinhVien: state.arrSinhVien,
    arrSinhVienFilter: state.arrSinhVienFilter
})

const ReactTableHOC = connect(mapStateToProps)(ReactTable)

export default ReactTableHOC;

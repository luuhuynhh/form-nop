import React, { Component } from 'react'
import { connect } from 'react-redux'
class SearchBar extends Component {
    handleChange = (e) => {
        e.preventDefault();
        let keySearch = e.target.value;
        keySearch = keySearch.trim().toLowerCase();

        const action = {
            type: 'LOC_SINH_VIEN',
            payload: keySearch
        }
        this.props.dispatch(action);
    }
    render() {
        return (
            <div className='container'>
                <input
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                        marginTop: '50px',
                        padding: '10px',
                        border: '1px solid #333',
                        borderRadius: '10px',
                    }
                    }
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Tìm kiếm theo tên..."
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    arrSinhVien: state.arrSinhVien
})

const SearchBarHOC = connect(mapStateToProps)(SearchBar);
export default SearchBarHOC;
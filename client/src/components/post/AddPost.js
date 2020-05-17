import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const AddPost = ({ addPost, history, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    text: '',
    name: '',
    phone: '',
    bloodGroup: '',
    area: '',
    thana: '',
    clinicName: ''
  });

  const { text, name, phone, bloodGroup, area, thana, clinicName } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addPost(formData, history);
  };

  if (isAuthenticated) {
    return <Redirect to='/posts/myPost' />;
  }

  return (
    <div className='container post-form'>
      <div className='welcome text-deep my-1' style={{ marginTop: '0.5em' }}>
        <p className='mid'>
          <i className='fas fa-user'></i> Blood Source এ স্বাগতম
        </p>
        <p className='lead my-1'>
          <i class='fas fa-heart'></i> আমরা রক্তের প্রয়োজনে আপনার পাশে দাঁড়াতে
          পেরে গর্বিত
        </p>
        <p className='lead my-1'>
          <i class='fas fa-smile'></i> দয়া করে নিচের তথ্যগুলো পূরণ করুন
        </p>
      </div>
      <form className='form my-1' onSubmit={e => onSubmit(e)}>
        <textarea
          name='text'
          cols='30'
          rows='4'
          placeholder='* আপনার রক্তের কেনো প্রয়োজন?'
          value={text}
          onChange={e => onChange(e)}
          required
        />
        <div className='form-group'>
          <select
            name='bloodGroup'
            value={bloodGroup}
            onChange={e => onChange(e)}
          >
            <option value='0'>* রক্তের গ্রুপ নির্বাচন করুন</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
          </select>
          <small className='form-text'>যে রক্তের গ্রুপ আপনার দরকার</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* আপনার নাম'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>সম্পূর্ণ নাম ব্যবহার করুন</small>
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='* মোবাইল নাম্বার'
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            এই মোবাইল নম্বর টি আপনার Login Id হিসেবে গণ্য হবে
          </small>
        </div>
        <div>
          <h3>Address</h3>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* হাসপাতালের/ক্লিনিক এর নাম'
              name='clinicName'
              value={clinicName}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>রোগী যেই হাসপাতালে ভর্তি আছে</small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* হাসপাতালের ঠিকানা'
              name='area'
              value={area}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              যেমনঃ বাড়ি-১০, রোড-১২, ব্লক-৮ ইত্যাদি
            </small>
          </div>
          <div className='form-group'>
            <select name='thana' value={thana} onChange={e => onChange(e)}>
              <option value='0'>* থানা</option>
              <option value='Adabar'>Adabar</option>
              <option value='Azampur'>Azampur</option>
              <option value='Badda'>Badda</option>
              <option value='Bangsal'>Bangsal</option>
              <option value='Bimanbandar'>Bimanbandar</option>
              <option value='Cantonment'>Cantonment</option>
              <option value='Chowkbazar'>Chowkbazar</option>
              <option value='Darus Salam'>Darus Salam</option>
              <option value='Demra'>Demra</option>
              <option value='Dhanmondi'>Dhanmondi</option>
              <option value='Gendaria'>Gendaria</option>
              <option value='Gulshan'>Gulshan</option>
              <option value='Hazaribagh'>Hazaribagh</option>
              <option value='Kadamtali'>Kadamtali</option>
              <option value='Kafrul'>Kafrul</option>
              <option value='Kalabagan'>Kalabagan</option>
              <option value='Kamrangirchar'>Kamrangirchar</option>
              <option value='Khilgaon'>Khilgaon</option>
              <option value='Khilkhet'>Khilkhet</option>
              <option value='Kotwali'>Kotwali</option>
              <option value='Lalbagh'>Lalbagh</option>
              <option value='Mirpur Model'>Mirpur Model</option>
              <option value='Mohammadpur'>Mohammadpur</option>
              <option value='Motijheel'>Motijheel</option>
              <option value='New Market'>New Market</option>
              <option value='Pallabi'>Pallabi</option>
              <option value='Paltan'>Paltan</option>
              <option value='Panthapath'>Panthapath</option>
              <option value='Ramna'>Ramna</option>
              <option value='Rampura'>Rampura</option>
              <option value='Sabujbagh'>Sabujbagh</option>
              <option value='Shah Ali'>Shah Ali</option>
              <option value='Shahbag'>Shahbag</option>
              <option value='Sher-e-Bangla Nagar'>Sher-e-Bangla Nagar</option>
              <option value='Shyampur'>Shyampur</option>
              <option value='Sutrapur'>Sutrapur</option>
              <option value='Tejgaon Industrial Area'>
                Tejgaon Industrial Area
              </option>
              <option value='Tejgaon'>Tejgaon</option>
              <option value='Turag'>Turag</option>
              <option value='Uttar Khan'>Uttar Khan</option>
              <option value='Uttara'>Uttara</option>
              <option value='Vatara'>Vatara</option>
              <option value='Wari'>Wari</option>
            </select>
            <small className='form-text'>সঠিক থানা বাছুন</small>
          </div>
        </div>
        <div>
          <small className='form-text'>
            By clicking Submit, you agree to our{' '}
            <Link to='/termsandconditions'>Terms</Link>,{' '}
            <Link to='/termsandconditions'>Data Policy</Link> and
            <Link to='/termsandconditions'> Cookie</Link> Policy. You may
            receive SMS notifications from us and can opt out at any time.
          </small>
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addPost })(AddPost);

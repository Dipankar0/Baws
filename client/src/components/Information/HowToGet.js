import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Image,
  Card,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap';

const HowToGet = props => {
  return (
    <div className='container text-deep landing-how'>
      <Card style={{ backgroundColor: '#2471a3' }}>
        <Card.Body>
          <Card.Title
            className='text-deep lead'
            style={{ textAlign: 'center', fontSize: '2em', color: '#ecf0f1' }}
          >
            রক্ত দাতা খুঁজার নিয়ামাবলিঃ
          </Card.Title>
          <Card.Text style={{ color: '#ecf0f1' }}>
            আপনি খুব সহজেই যে কোন রুগির জন্য আমাদের সহযোদ্ধাদের কাছ থেকে রক্ত
            পেতে পারেন। আপনি যদি প্রথমবার রক্ত নিতে চান তবে নিন্মক্ত নিয়মাবলী
            আনুসরন করুনঃ <br />
            <br />• <Link to='newApplication'>New Application</Link> এ ক্লিক
            করুন এবং ওইখানের ফাকা ঘর গুল সঠিকভাবে পূরণ করুন। <br />• প্রথম ঘরটি
            তে আপনার কেন রক্ত প্রয়োজন সেটা লিখুন এবং রুগির বর্তমান অবস্থা, রোগের
            বিবরণ এর তথ্যগুলো পূরণ করুন। <br />• এরপর আপনার মোবাইল নম্বর দিন।
            মনে রাকবেন এই মোবাইল নম্বর খুভই গুরুত্বপূর্ণ। এটা দিয়ে প্রবর্তিতে
            আপনি আমাদের এই (web service) Blood Source ব্যবহার করতে পারবেন এবং এই
            মোবাইল নম্বর পরিবর্তন করা যাবে না। <br />• এরপর আপনার নিজের নাম
            লিখুন। <br />• প্রবর্তিতে রোগীর ব্লাড গ্রুপ(Blood Group) প্রদান
            করুন। <br />• এরপর হাসপাতাল বা ক্লিনিক এর ঠিকানা সঠিকভাবে প্রদান
            করুন। <br />
            <br />
            সকল ঘরগুলো পূর্ণ হয়ে গেলে Submit Button টিতে Click করবেন। অতপর
            আপনাকে Dashboard নামক পেজে নিয়ে যাওয়া হবে জেখানে আপনি আপনার রক্ত
            দাতা (Blood Donor) এর লিস্ট দেকতে পাবেন এবং তাদের সাথে যোগাযোগ করে
            দ্রুত রক্ত সংগ্রহ করতে পারবেন। আপনার অ্যাপ্লিকেশান টি করার পর
            স্বয়ংক্রিয় একটি আইডি তৈরি হবে। আপনি পরবর্তীতে যেকোনো সময়ে আপনার
            মোবাইল নম্বর ব্যবহার করে লগইন(login) করতে পারবেন এবং আপনার
            অ্যাপ্লিকেশান, রক্ত দাতাদের লিস্ট দেকে নিতে পারবেন। এই আইডিটি
            ব্যবহার করে আপনি পরবর্তীতে যতবার খুশি যেকোনো ব্লাড গুরুপ (Blood
            group) এর রক্তের জন্যে রক্ত দাতা (Blood Donor) খুঁজতে পারবেন। <br />
            <br />
            মনে রাকবেন আমরা আছি আপনাদের পাসে, তাই আমদের সাথে যোগাযোগ করে আপনাকে
            রক্ত দেয়ার সুযোগ দিন।
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

HowToGet.propTypes = {};

export default HowToGet;

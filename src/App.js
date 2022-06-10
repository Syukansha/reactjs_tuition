import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router ,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import axios from 'axios';
import index from "./component/index";
import deleteUser from "./component/deleteUser_component";
import login from "./component/login";
import index2 from "./component/index2";
import student from "./component/student_list";
import editStudent from "./component/student_edit";
import insertStudent from "./component/student_insert";
import study from "../src/component/images/bg-img.png";
import ProtectedRoute from "./component/ProtectedRoute";
import updateSubjects from "./component/update_subjects";
import insertStaff from "./component/staff_insert";
import staff from "./component/staff_list"
import editStaff from "./component/staff_edit";
import insertTeacher from "./component/teacher_insert"
import teacher from "./component/teacher_list"
import teacherEdit from "./component/teacher_edit"
import subjectList from "./component/subject_list"
import student_detail from "./component/student_detail"
import subjects_detail from "./component/subjects_detail"
import {ReactSession} from 'react-client-session';

function App() {
  
  ReactSession.setStoreType("localStorage");
  
  return (
    <div className="bg_img">
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    <Router>
     
      <Route path="/" exact component={login}></Route>
      <Route path="/deleteUser" exact component={deleteUser}></Route>
      <ProtectedRoute path="/dashboard" exact component={index2} />
      <ProtectedRoute path="/studentList" exact component={student} />
      <ProtectedRoute path="/studentEdit/:id" exact component={editStudent} />
      <ProtectedRoute path="/studentInsert" exact component={insertStudent} />
      <ProtectedRoute path="/updateSubjects/:id" exact component={updateSubjects} />
      <ProtectedRoute path="/insertStaff" exact component={insertStaff} />
      <ProtectedRoute path="/staffList" exact component={staff} />
      <ProtectedRoute path="/staffEdit/:id" exact component={editStaff} />
      <ProtectedRoute path="/insertTeacher" exact component={insertTeacher} />
      <ProtectedRoute path="/teacherList" exact component={teacher} />
      <ProtectedRoute path="/teacherEdit/:id" exact component={teacherEdit} />
      <ProtectedRoute path="/subjectList" exact component={subjectList} />
      <ProtectedRoute path="/student_detail/:id" exact component={student_detail} />
      <ProtectedRoute path="/subjects_detail/:name" exact component={subjects_detail} />
    </Router>
    
    </div>
  )
}

export default App;

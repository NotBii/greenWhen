import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/authContext';
import AdminPage from './pages/AdminPage'
import CalendarPage from './pages/CalendarPage';
import Main from './pages/Main';
import Page from './pages/Page';
import CreateBoard from './pages/CreateBoard';
import UpdateBoard from './pages/UpdateBoard';
import Bulletin from './pages/Bulletin';
import NoteListComponent from './components/Note/NoteListComponent';
import NoteReadComponent from './components/Note/NoteReadComponent';
import NoteWriteComponent from './components/Note/NoteWriteComponent';
import NoteSentListComponent from './components/Note/NoteSentListComponent';
import ManageGroup from './pages/ManageGroup';
import WillBeDeleted from './pages/WillBeDeleted';
import SearchingFunction from './components/SearchingThings/SearchingFunction';


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {/*로그인 여부, 유저권한에 따라서 조건에 부합하지 않을경우 홈으로 이동 */}
        {/*홈페이지 */}
        <Route path="/" element={<HomePage />} />
        {/*개인정보 변경 */}
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
        {/*관리자 페이지 */}
        <Route path="/admin/" element={!authCtx.isLoggedIn || authCtx.userObj.role !== 'ROLE_ADMIN' ? <Navigate to='/' /> : <AdminPage />} />
        {/*달력 페이지 */}
        <Route path="/calendar/" element= {<CalendarPage />}/>
        {/*소모임 메인 */}
        <Route path="/main" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <Main />} />
        {/*게시글 보이는 페이지*/}
        <Route path="/page" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <Page />} />
        {/*글쓰기 */}
        <Route path="/create-board" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateBoard />} />
        {/*글 수정 */}
        <Route path="/update-board" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <UpdateBoard />} />
        {/*소모임 페이지(게시판, 달력 있는곳) */}
        <Route path="/bulletin" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <Bulletin />} />         
        {/*쪽지메인 페이지 (받은쪽지 보임) */}
        <Route path="/note" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteListComponent/>}></Route>
        {/*쪽지 보내기*/}
        <Route path="/noteWrite" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteWriteComponent/>}></Route>
        {/*쪽지 읽기*/}
        <Route path="/noteRead/:no" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteReadComponent/>}> </Route>
        {/*보낸 쪽지함 */}
        <Route path="/noteSentList" element = {!authCtx.isLoggedIn ? <Navigate to='/' /> : <NoteSentListComponent/>}></Route>                
        {/*그룹 관리 */}
        <Route path="/manage-group" element={<ManageGroup/>} />
        {/*내정보(쓴글, 가입한 소모임, 초대, 댓글목록) */}
        <Route path="/willBeDeleted" element={<WillBeDeleted />} />
        {/*검색 결과값 */}
        <Route path="/searching-function" element={<SearchingFunction />} />
      </Routes>
    </Layout>
  );
}

export default App;
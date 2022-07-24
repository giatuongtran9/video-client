import { useState } from 'react';
import styled, { ThemeProvider} from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SideBar from './components/SideBar';

import { darkTheme, lightTheme } from './utils/Theme';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Authentication from './pages/Authentication';
import Video from './pages/Video';

const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`

const Wrapper = styled.div`
  padding: 22px 96px;
`

function App() {
  const [mode, setMode] = useState(false)

  return (
    <ThemeProvider theme={mode ? lightTheme : darkTheme}>
      <Container>
        <BrowserRouter>
          <SideBar mode={mode} setMode={setMode}/>

          <Main>
          <NavBar />
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home type="random" />}>
                  <Route path="trend" element={<Home type="trend"/>} />
                  <Route path="subscription" element={<Home type="sub"/>} />
                  <Route path="auth" element={<Authentication />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>

        </BrowserRouter>
      </Container>
    </ThemeProvider>
    
  );
}

export default App;

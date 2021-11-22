import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaList } from 'react-icons/fa';
import { Header } from '../../components';
import { candidateData } from '../../types/Datas';
import trophyImg from '../../images/winner.png';

interface Props {
  winCandidate: candidateData | undefined;
  title: string | undefined;
  worldcupId: string | undefined;
}

function Gameover({ winCandidate, title, worldcupId }: Props): JSX.Element {
  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const tempOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  const keydownEventHander = (event: React.KeyboardEvent<HTMLElement>) => {
    const { code } = event;
    if (code === 'Space' || code === 'Enter') {
      const tempText = text.trim();
      if (tempText.length === 0) {
        setText('');
        return;
      }
      setKeywords((prev) => [...prev, tempText]);
      setText('');
      event.preventDefault();
    } else if (code === 'Backspace') {
      if (text === '') {
        setText(keywords[keywords.length - 1]);
        setKeywords((prev) => prev.slice(0, -1));
      }
    }
  };
  return (
    <Wrapper>
      <Header type="header" />
      <Container>
        <img src={trophyImg} alt="trophy" />
        <Title>{title || ''} 우승!</Title>
        <Winner imageUrl={winCandidate ? winCandidate.url : ''} />
        <Name>{winCandidate?.name}</Name>
        <ButtonContainer>
          <Link to={`/ranking/${worldcupId || ''}`}>
            <Button>
              <FaList />
              <span>랭킹보기</span>
            </Button>
          </Link>
          <Link to="/main">
            <Button>
              <FaHome />
              <span>메인으로</span>
            </Button>
          </Link>
        </ButtonContainer>
      </Container>
      <KeywordContainer>
        {keywords.map((keyword) => (
          <Keyword>#{keyword}</Keyword>
        ))}
        <KeywordInput value={text} onChange={tempOnChange} onKeyUp={keydownEventHander} />
      </KeywordContainer>
    </Wrapper>
  );
}

const KeywordContainer = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  width: 700px;
  border: 1px solid;
  flex-wrap: wrap;
  ${({ theme }) => theme.fontStyle.body};
`;

const Keyword = styled.div`
  margin-right: 10px;
  background-color: #e1e1e1;
  padding-right: 10px;
  padding-left: 10px;
  ${({ theme }) => theme.fontStyle.body};
`;

const KeywordInput = styled.input`
  padding-left: 3px;
  border: 1px solid;
  background-color: #e1e1e1;
`;

const Name = styled.div`
  position: absolute;
  left: 50%;
  top: 160px;
  height: 40px;
  transform: translate(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0px 10px 0px 10px;
  background-color: ${({ theme }) => theme.color.primary};
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 350px;
  align-self: center;
  cursor: pointer;
  z-index: 1;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.primary};
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;
  ${({ theme }) => theme.fontStyle.bodyBold};
`;

const Winner = styled.div<{ imageUrl: string }>`
  width: 600px;
  height: 500px;
  margin-top: 50px;
  margin-bottom: 100px;
  background: url(${({ imageUrl }) => imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  align-self: center;
`;

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.color.lightpink};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
  img {
    position: absolute;
    align-self: center;
    top: 160px;
    width: 650px;
  }
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyle.h2Bold}
  align-self:center;
  text-align: center;
  width: 90%;
`;

export default Gameover;

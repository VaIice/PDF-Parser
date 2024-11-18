import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #e4e4e7;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 1280px;
  > h2 {
    margin: 0px;
  }
`;

const UploadWrapper = styled(Wrapper)`
  > label {
    display: inline-block;
    padding: 10px 15px;
    margin-top: 20px;
    margin-right: 16px;
    color: white;
    background: #181818;
    border: none;
    border-radius: 4px;

    &:hover {
      background: #2f2f2f;
      cursor: pointer;
    }
  }

  > input {
    display: none;
  }

  > span {
    margin-top: 20px;
    color: #16a34a;
  }
`;

const ViewerWrapper = styled(Wrapper)`
  > div {
    > canvas {
      border: 1px solid #eee;
      margin: 1rem 0;
    }

    > div {
      display: flex;
      justify-content: center;

      > button {
        display: inline-block;
        padding: 5px 10px;
        margin: 0px 16px;
        color: white;
        background: #181818;
        border: none;
        border-radius: 4px;

        &:hover {
          background: #2f2f2f;
          cursor: pointer;
        }

        &:disabled {
          background: #bbb;
          cursor: default;
        }
      }
    }
  }
`;

const ParserWrapper = styled(Wrapper)`
  > div {
    border: 1px solid #eee;
    overflow: hidden;
    margin: 20px 0;

    > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid #eee;

      &:first-child {
        background-color: #fafafa;
        text-align: center;
      }

      &:last-child {
        border-bottom: none;
      }

      > div {
        padding: 16px;
        line-height: 1.5;

        &:first-child {
          border-right: 1px solid #eee;
        }
      }
    }
  }

  > button {
    display: inline-block;
    padding: 5px 10px;
    margin: 0px 16px;
    color: white;
    background: #181818;
    border: none;
    border-radius: 4px;

    &:hover {
      background: #2f2f2f;
      cursor: pointer;
    }
  }
`;

export { UploadWrapper, ViewerWrapper, ParserWrapper };

"use client";

import styled from "styled-components";
export const FormDepositStyles = styled.div`
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
  .form-head {
    text-align: center;
    .contentTitle {
      font-size: 60px;
      text-align: center;
      font-style: normal;
      font-weight: 700;
      line-height: 132%;
      background: linear-gradient(180deg, #e2fff7 0%, #28ffc6 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .contentSub {
      max-width: 560px;
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }
  }

  .form-content {
    width: 100%;
    max-width: 600px;
    border-radius: 12px;
    padding: 2px;
    margin: 0 auto;
    margin-top: 60px;

    background: conic-gradient(
      from 180deg at 50% 50%,
      #94ffdf 0deg,
      rgba(148, 255, 223, 0) 86.04deg,
      #94ffdf 179.79deg,
      rgba(148, 255, 223, 0) 273.54deg,
      #94ffdf 360deg
    );
    .form-module {
      width: 100%;
      height: 100%;
      background-image: url("/images/form/bg.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-radius: 12px;
      overflow: hidden;

      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 32px;
      .form-group {
        .label {
          font-size: 20px;
          line-height: 150%;
        }
        input {
          border: 1px solid #ffffff33;
          width: 100%;
          height: 64px;
          border-radius: 8px;
          padding: 16px;

          font-weight: 500;
          font-size: 20px;
          background: transparent;
          color: white;
          outline: none;

          &::placeholder {
            color: #ffffff99;
          }
        }

        &.account {
          display: flex;
          flex-direction: column;
          gap: 16px;
          .note {
            font-weight: 500;
            color: #fff964;
            line-height: 150%;
          }
        }

        &.total-wallet {
          display: flex;
          flex-direction: column;
          gap: 16px;
          .group-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .group-content {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 12px;
            .balance {
              font-size: 20px;
              color: #94ffdf;
            }
            .input-group {
              position: relative;

              width: 100%;
              input {
                font-weight: 700;
                font-size: 24px;
                color: #fff964;
              }
            }
            .max {
              width: 69px;
              height: 35px;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(90deg, #78ffb6 0%, #3af3e8 100%);
              font-size: 16px;
              font-weight: 500;
              color: #000;
              position: absolute;
              right: 16px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 1;
              cursor: pointer;
            }
          }
          .select-token {
            background: #ffffff33;
            border-radius: 8px;
            height: 48px;
            .MuiSelect-indicator {
              transform: rotate(-90deg);
            }
            span {
              font-size: 20px;
            }
          }
        }
      }
      .btn_deposit {
        height: 48px;
        border: 1px solid #2b937a;
        background: linear-gradient(90deg, #78ffb6 0%, #3af3e8 100%);
        padding: 0 24px;
        border-radius: 4px;
        outline: none;
        font-size: 16px;
        font-weight: 600;
        color: #000;
        cursor: pointer;
        transition: all 0.2s linear;
        &:hover {
          opacity: 0.8;
        }
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .form-head {
      .contentTitle {
        /* font-size: 32px; */
        text-align: center;
      }
      .contentSub {
        font-size: 14px;
        margin-top: 16px;
      }
    }
    .form-content {
      margin-top: 50px;
    }
  }

  @media only screen and (max-width: 600px) {
    .form-content {
      .form-module {
        gap: 20px;
        padding: 20px 15px;
        .form-group {
          .label {
            font-size: 16px;
          }
          input {
            height: 50px;
            font-size: 16px;
          }

          &.account {
            gap: 12px;
            .note {
              font-size: 14px;
            }
          }
          &.total-wallet {
            gap: 12px;
            .group-content {
              .balance {
                font-size: 16px;
              }
              .input-group {
                input {
                  font-size: 20px;
                }
                .max {
                  right: 8px;
                }
              }
            }
          }
        }
        .btn_deposit {
          height: 44px;
        }
      }
    }
  }
`;

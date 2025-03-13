import styled from "styled-components";

export const StyledHistory = styled.div`

  .title {
    margin-bottom: 25px;
  }

  .table-history{
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #1f2134;
      border-radius: 10px;
    }
    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: separate;
      thead {
        top: 0;
        position: sticky;
        top: 0;
        tr {
          width: 100%;
          th {
            background: #ffffff1f;
            border-top: 1px solid #ffffff1a;
            .th {
              padding: 16px 12px;

              p {
                font-weight: 600;
                font-size: 16px;
                color: #ffffff;
                white-space: nowrap;
                text-align: left;
              }
            }
            &:first-child {
              border-top-left-radius: 8px;
              padding-left: 15px;
            }
            &:last-child {
              border-top-right-radius: 8px;
              padding-right: 15px;
            }
          }
        }
      }
      tbody {
        tr {
          width: 100%;
          td {
            padding: 12px 12px;
            text-align: left;
            font-size: 16px;
            line-height: 24px;
            color: #ffffff;
            white-space: nowrap;
            background: #ffffff0d;

            .wallet {
              background: rgba(145, 255, 127, 0.1);
              color: rgba(145, 255, 127, 1);
              padding: 2px 6px;
              border-radius: 20px;
            }
            .stt-pending {
              color: rgba(236, 240, 40, 1);
              background: #ECF02833;
              padding: 4px 5px 0px;
              width: fit-content;
              border-radius: 15px;
            }
            .stt-success {
              background: rgba(145, 255, 127, 0.2);
              padding: 4px 5px 0px;
              width: fit-content;
              border-radius: 15px;
              color: rgba(145, 255, 127, 1)
            }
            .token {
              display: inline-flex;
              span {
                margin-left: 7px;
              }
            }
          }
          &:nth-child(even) {
            background: #ffffff1f;
          }
          &:last-child {
            td {
              &:first-child {
                border-bottom-left-radius: 8px;
                overflow: hidden;
              }
              &:last-child {
                border-bottom-right-radius: 8px;
                overflow: hidden;
              }
            }
          }
        }
      }
    }

    @media only screen and (max-width: 479px) {
      table {
        thead {
          tr {
            th {
              .th {
              }
            }
          }
        }
      }
    }
  }

  .no-data {
    height: calc(100vh - 320px);
    color: #858585;
    padding: 50px;
    font-size: 24px;
  }
  // pagination
  .content-pagination {
    margin-top: 25px;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  @media only screen and (max-width: 1024px) {
    .table-history {
      overflow-x: auto;
      overflow-y: scroll;
      width: 100%;
    }
    .no-data {
      height: calc(100vh - 290px);
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 480px) {
    display: block;
    .content-pagination {
      margin: 0 auto;
    }
    .no-data {
      height: calc(100vh - 270px);
    }
  }

  @media screen and (max-width: 479px) {
    display: block;
    .no-data {
      height: calc(100vh - 280px);
    }
  }

  ul {
    li {
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        font-size: 16px;
        cursor: pointer;
        pointer-events: auto;
        margin: 0 7px;
        border-radius: 50%;
        border: 1px solid #94ffdf;
        background: transparent;
        color: #fff;
        &:hover {
          box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
        }
      }
      .Mui-selected {
        background: linear-gradient(90deg, #78FFB6 0%, #3AF3E8 100%);
        color: #1F1F1F;
        cursor: not-allowed;
        pointer-events: not-allowed;
      }
      .MuiPaginationItem-previousNext {
        border: none;
        margin: 0 10px;
      }
    }
  }
`;



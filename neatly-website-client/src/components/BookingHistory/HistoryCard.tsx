import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDownList from "./DropdownList.js";
import useFormattedDate from "../../hooks/useFormattedDate.js";

function HistoryCard({
  bookingsHistory,
  bookIds,
  bookId,
  bookDate,
  checkIn,
  checkOut,
  roomId,
  paymentMethod,
  threeCreditCardNum,
  totalPrice,
  totalPriceAddReqs,
  standard,
  special,
  additional,
  onRoomDetail,
  roomType,
  roomImages,
  roomAmount,
  personAmount,
  night,
  cancel_date,
}: any) {
  const [timeRemaining, setTimeRemaining] = useState({});
  const [buttonVisibilities, setButtonVisibilities] = useState({});
  const [cancelVisible, setCancelVisible] = useState({});

  const navigate = useNavigate();

  const backgroundImage = {
    backgroundImage: `url('${roomImages[2]}')`,
  };

  /*check time*/
  useEffect(() => {
    const currentDate = new Date();
    const millisecondsIn24Hours = 24 * 60 * 60 * 1000;

    const updatedButtonVisibilities = {};
    const updateCancel = {};
    const timeRemain = {};
    bookIds.forEach((id) => {
      const book = bookingsHistory.find((book) => book.book_id === id);
      if (book) {
        const checkInDateCheck = new Date(book.check_in);

        if (checkInDateCheck < currentDate) {
          updatedButtonVisibilities[id] = false;
          updateCancel[id] = false;
        } else {
          const timeDifference = Math.abs(checkInDateCheck - currentDate);
          if (timeDifference < millisecondsIn24Hours) {
            updatedButtonVisibilities[id] = false;
            updateCancel[id] = true;
          } else {
            updatedButtonVisibilities[id] = true;
            updateCancel[id] = true;
            timeRemain[id] = true;
          }
        }
      }
    });

    setButtonVisibilities(updatedButtonVisibilities);
    setCancelVisible(updateCancel);
    setTimeRemaining(timeRemain);
  }, [bookIds, bookingsHistory]);

  const handleClickChangeDate = () => {
    if (timeRemaining[bookId] === true) {
      navigate(`/changeDate/${bookId}`);
    } else {
      setButtonVisibilities({ ...buttonVisibilities, [bookId]: true });
    }
  };

  const handleClickCancel = (bookId) => {
    if (timeRemaining[bookId] === true) {
      navigate(`/refund/${bookId}`);
    } else {
      navigate(`/cancleBooking/${bookId}`);
      setButtonVisibilities({ ...buttonVisibilities, [bookId]: true });
    }
  };
  console.log(standard);

  /*apply early check-in or late check-out if they exist*/
  let checkInTime = "After 2:00 PM";
  if (standard.some((req) => req === "Early check-in")) {
    checkInTime = "After 1:00 PM";
  }

  let checkOutTime = "After 11:00 PM";
  if (standard.some((req) => req === "Late check-out")) {
    checkOutTime = "After 12:00 PM";
  }

  return (
    <>
      <div className="flex flex-col items-center w-full bg-bg text-gray-700">
        <div className=" flex flex-col py-10 border-b-[1px] border-gray-300">
          <div className="w-[1120px] flex justify-between">
            <div
              style={backgroundImage}
              className="w-[357px] h-[210px] rounded bg-cover bg-center"
            ></div>
            <div className="flex flex-col justify-between w-[715px]">
              <div className="flex flex-row justify-between items-center mb-5">
                <h2 className="text-headline4 text-black">{roomType}</h2>
                <div className="flex flex-col items-end mb-2 text-body1 text-gray-600">
                  <p>
                    Booking date: <span>{useFormattedDate(bookDate)}</span>
                  </p>
                  {cancel_date !== null && (
                    <p>
                      Cancellation date:{" "}
                      <span>{useFormattedDate(cancel_date)}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className=" flex gap-10">
                <div className="flex flex-col gap-1">
                  <p className=" font-bold text-grey-800">Check-in</p>
                  <div>
                    <span>{useFormattedDate(checkIn)}</span>
                    <span className="px-2">|</span>
                    <span>{checkInTime}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-grey-800">Check-out</p>
                  <div>
                    <span>{useFormattedDate(checkOut)}</span>
                    <span className="px-2">|</span>
                    <span>{checkOutTime}</span>
                  </div>
                </div>
              </div>
              <DropDownList
                totalPrice={totalPrice}
                totalPriceAddReqs={totalPriceAddReqs}
                standard={standard}
                special={special}
                additional={additional}
                roomType={roomType}
                roomAmount={roomAmount}
                personAmount={personAmount}
                paymentMethod={paymentMethod}
                threeCreditCardNum={threeCreditCardNum}
                night={night}
              />
            </div>
          </div>
          <div className="flex justify-between -ml-4 pt-5">
            <div className="flex items-start">
              {cancelVisible[bookId] && cancel_date === null && (
                <button
                  className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
                  onClick={() => {
                    handleClickCancel(bookId);
                  }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
            <div className="flex items-end gap-6">
              <button
                onClick={() => onRoomDetail(roomId)}
                className="btn capitalize bg-bg border-none font-semibold text-body1 text-base  text-orange-500 hover:bg-bg"
              >
                Room Detail
              </button>
              {buttonVisibilities[bookId] && cancel_date === null && (
                <button className="btn Button" onClick={handleClickChangeDate}>
                  Change Date
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HistoryCard;

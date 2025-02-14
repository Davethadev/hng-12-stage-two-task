import { Progress } from "@/components/ui/progress";

import { TicketDetails } from "@/types/types";

type TicketReadyProps = {
  bookAnotherTicket: () => void;
  ticketDetails: TicketDetails;
};

const TicketReady = ({
  bookAnotherTicket,
  ticketDetails: {
    name,
    email,
    specialRequest,
    numberOfTickets,
    ticketType,
    userImageUrl,
  },
}: TicketReadyProps) => {
  return (
    <div className="border border-[#0E464F] bg-[#041E23] rounded-2xl w-[90%] md:w-2xl mx-auto p-6 space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl">Ready</h2>
        <p className="text-white">Step 3/3</p>
      </div>
      <Progress value={100} />
      <div className="pt-6 space-y-4">
        <h1 className="text-3xl md:text-4xl font-medium text-white text-center alatsi">
          Your Ticket is Booked!
        </h1>
        <p className="roboto text-white text-center font-light">
          Check your email for a copy or you can{" "}
          <span className="font-medium hover:cursor-pointer">download</span>
        </p>
      </div>
      <div className="w-[300px] h-[670px] mx-auto space-y-4 relative">
        <div className="w-[300px] h-[601px]">
          <img src="./ticket-bg.svg" alt="" className="w-full h-full" />
        </div>
        <div className="absolute inset-0 px-4 py-6 top-0">
          <div className="border border-[#24A0B5] rounded-lg p-3 space-y-2 w-[95%] mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-medium text-white road-rage">
                Techember Fest ”25
              </h2>
              <small className="roboto text-white font-light block">
                📍 04 Rumens road, Ikoyi, Lagos
              </small>
              <small className="roboto text-white font-light block">
                📅 March 15, 2025 | 7:00 PM
              </small>
            </div>
            <div className="w-36 h-36 mx-auto border-4 border-[#24A0B5] rounded-lg">
              <div className="w-full h-full relative">
                <img
                  src={userImageUrl}
                  alt=""
                  className="w-full h-full absolute inset-0 object-cover overflow-hidden aspect-auto"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-lg w-full p-2 bg-[#08343C]">
              <div className="space-y-2">
                <small className="text-[#B3B3B3] roboto font-light">
                  Enter your name
                </small>
                <p className="roboto text-white font-medium text-sm">{name}</p>
              </div>
              <div className="space-y-2">
                <small className="text-[#B3B3B3] roboto font-light">
                  Enter your email
                </small>
                <p className="roboto text-white font-medium text-sm">
                  {email.length > 10 ? `${email.substring(0, 10)}...` : email}
                </p>
              </div>
              <div className="space-y-2">
                <small className="text-[#B3B3B3] roboto font-light">
                  Ticket Type
                </small>
                <small className="roboto text-white font-light block uppercase">
                  {ticketType}
                </small>
              </div>
              <div className="space-y-2">
                <small className="text-[#B3B3B3] roboto font-light">
                  Ticket for
                </small>
                <small className="roboto text-white font-normal block">
                  {numberOfTickets}
                </small>
              </div>
              <div className="col-span-2 w-full">
                <small className="text-[#B3B3B3] roboto font-light">
                  Special request?
                </small>
                <small className="roboto text-white font-light block w-full">
                  {specialRequest === ""
                    ? "Nil"
                    : specialRequest.length > 16
                    ? `${specialRequest.substring(0, 16)}...`
                    : specialRequest}
                </small>
              </div>
            </div>
          </div>
          <div></div>
          <div className="flex justify-center mt-8">
            <img src="./barcode.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <button
          onClick={bookAnotherTicket}
          className="h-12 border border-[#0E464F] rounded-md text-[#24A0B5] text-center hover:cursor-pointer"
        >
          Book Another Ticket
        </button>
        <button className="h-12 rounded-md bg-[#24A0B5] text-white text-center hover:cursor-pointer">
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketReady;

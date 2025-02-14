import { useState, useEffect } from "react";

import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import { TicketDetails } from "@/types/types";
import ImageUpload from "./ImageUpload";

type AttendeeDetailsProps = {
  previous: () => void;
  next: () => void;
  ticketDetails: TicketDetails;
  setTicketDetails: any;
};

const AttendeeDetails = ({
  previous,
  next,
  ticketDetails,
  setTicketDetails,
}: AttendeeDetailsProps) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");

  useEffect(() => {
    const validateForm = () => {
      const { name, email, specialRequest } = ticketDetails;

      const isValid = name && email && specialRequest && cloudinaryUrl;

      setIsFormValid(isValid as unknown as boolean);
    };
    validateForm();
  }, [ticketDetails]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast("Please fill in all required fields");
      return;
    }
    next();
  };

  return (
    <div className="border border-[#0E464F] bg-[#041E23] rounded-2xl w-[90%] md:w-2xl mx-auto p-6 space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl">Attendee Details</h2>
        <p className="text-white">Step 2/3</p>
      </div>
      <Progress value={66} />
      <div className="border border-[#0E464F] bg-[#08252B] rounded-2xl space-y-4 p-6">
        <div className="border border-[#0E464F] bg-[#052228] rounded-2xl space-y-4 p-6">
          <label className="text-white font-light roboto block">
            Upload Profile Photo
          </label>
          <div className="w-full h-40 bg-[#00000033] rounded-2xl flex justify-center items-center">
            <ImageUpload
              cloudinaryUrl={cloudinaryUrl}
              setCloudinaryUrl={setCloudinaryUrl}
              ticketDetails={ticketDetails}
              setTicketDetails={setTicketDetails}
            />
          </div>
        </div>
        <span className="w-full h-px bg-[#0E464F] block my-6"></span>
        <form action="" className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-white font-light roboto block"
            >
              Enter your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={ticketDetails.name}
              onChange={(e) =>
                setTicketDetails({ ...ticketDetails, name: e.target.value })
              }
              required
              className="h-12 w-full border border-[#0E464F] outline-none bg-transparent rounded-lg indent-4 text-white text-sm roboto font-light"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-white font-light roboto block"
            >
              Enter your email *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={ticketDetails.email}
                onChange={(e) =>
                  setTicketDetails({ ...ticketDetails, email: e.target.value })
                }
                required
                className="h-12 w-full border border-[#0E464F] outline-none bg-transparent rounded-lg indent-12 text-white text-sm roboto font-light"
              />
              <span className="absolute left-4 top-3">
                <img src="./envelope.svg" alt="" />
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="special_request"
              className="text-white font-light roboto block"
            >
              Special request?
            </label>
            <textarea
              name="special_request"
              id="special_request"
              style={{ resize: "none" }}
              placeholder="Textarea"
              onChange={(e) =>
                setTicketDetails({
                  ...ticketDetails,
                  specialRequest: e.target.value,
                })
              }
              value={ticketDetails.specialRequest}
              className="h-36 w-full border border-[#0E464F] outline-none bg-transparent rounded-lg p-4 text-white text-sm roboto font-light"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <button
              onClick={previous}
              className="h-12 border border-[#0E464F] rounded-md text-[#24A0B5] text-center hover:cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="h-12 rounded-md bg-[#24A0B5] text-white text-center hover:cursor-pointer"
            >
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendeeDetails;

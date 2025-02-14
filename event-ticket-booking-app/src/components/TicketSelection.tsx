import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Progress } from "@/components/ui/progress";

import { toast } from "sonner";
import { TicketDetails } from "@/types/types";

type TicketSelectionProps = {
  next: () => void;
  ticketDetails: TicketDetails;
  setTicketDetails: any;
};

const TicketSelection = ({
  next,
  ticketDetails,
  setTicketDetails,
}: TicketSelectionProps) => {
  const form = useForm();
  const [isSelected, setIsSelected] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState("");

  const selectTicketType = (selectedTicketType: string) => {
    setTicketDetails({ ...ticketDetails, ticketType: selectedTicketType });
    setSelectedTicketType(selectedTicketType);
    setIsSelected(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      toast("Please select a ticket type");
      return;
    }
    next();
  };

  useEffect(() => {
    const validateForm = () => {
      const isValid = ticketDetails.ticketType !== "";

      setIsFormValid(isValid as unknown as boolean);
    };
    validateForm();
  }, [ticketDetails]);

  return (
    <div className="border border-[#0E464F] bg-[#041E23] rounded-2xl w-[90%] md:w-2xl mx-auto p-6 space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl">Ticket Selection</h2>
        <p className="text-white">Step 1/3</p>
      </div>
      <Progress value={33} />
      <div className="border border-[#0E464F] bg-[#041E23] rounded-2xl space-y-4 p-6">
        <div className="text-center space-y-6 md:space-y-2 border border-[#0E464F] rounded-2xl p-4 banner">
          <h1 className="text-4xl md:text-5xl font-medium text-white road-rage flex items-center justify-center gap-4">
            <span className="italic leading-relaxed block">Techember</span>
            Fest ”25
          </h1>
          <p className="roboto text-white font-light">
            Join us for an unforgettable experience at
            <br className="hidden md:block" /> [Event Name]! Secure your spot
            now.
          </p>
          <p className="roboto text-white font-light flex flex-col md:flex-row items-center justify-center gap-4 h-max">
            <span>📍 [Event Location]</span>
            <span className="hidden md:block">||</span>
            <span>March 15, 2025 | 7:00 PM</span>
          </p>
        </div>
        <span className="w-full h-px bg-[#0E464F] block my-6"></span>
        <Form {...form}>
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="space-y-6"
          >
            <p className="roboto text-white font-normal">Select Ticket Type:</p>
            <div className="border border-[#0E464F] bg-[#041E23] rounded-2xl p-2.5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <article
                onClick={() => selectTicketType("regular")}
                className={`border border-[#197686] bg-[#041E23] rounded-xl px-2 py-4 hover:bg-[#197686] ${
                  (isSelected && selectedTicketType === "regular") ||
                  ticketDetails.ticketType === "regular"
                    ? "bg-[#197686]"
                    : ""
                } hover:cursor-pointer`}
              >
                <h3 className="roboto text-white text-xl font-semibold">
                  Free
                </h3>
                <p className="uppercase roboto text-white font-light">
                  Regular Access
                </p>
                <small className="text-white font-light roboto">20/52</small>
              </article>
              <article
                onClick={() => selectTicketType("vip")}
                className={`border border-[#197686] bg-[#041E23] rounded-xl px-2 py-4 hover:bg-[#197686] ${
                  (isSelected && selectedTicketType === "vip") ||
                  ticketDetails.ticketType === "vip"
                    ? "bg-[#197686]"
                    : ""
                } hover:cursor-pointer`}
              >
                <h3 className="roboto text-white text-xl font-semibold">
                  $150
                </h3>
                <p className="uppercase roboto text-white font-light">
                  VIP Access
                </p>
                <small className="text-white font-light roboto">20/52</small>
              </article>
              <article
                onClick={() => selectTicketType("vvip")}
                className={`border border-[#197686] bg-[#041E23] rounded-xl px-2 py-4 hover:bg-[#197686] ${
                  (isSelected && selectedTicketType === "vvip") ||
                  ticketDetails.ticketType === "vvip"
                    ? "bg-[#197686]"
                    : ""
                } hover:cursor-pointer`}
              >
                <h3 className="roboto text-white text-xl font-semibold">
                  $150
                </h3>
                <p className="uppercase roboto text-white font-light">
                  VVIP Access
                </p>
                <small className="text-white font-light roboto">20/52</small>
              </article>
            </div>
            <div className="space-y-2">
              <label className="text-white font-normal roboto block">
                Number of Tickets
              </label>
              <FormField
                control={form.control}
                name="numberOfTickets"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setTicketDetails({
                          ...ticketDetails,
                          numberOfTickets: value,
                        });
                      }}
                      defaultValue={
                        ticketDetails.numberOfTickets ?? field.value
                      }
                      required
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border border-[#0E464F] bg-transparent text-white roboto">
                          <SelectValue
                            placeholder={ticketDetails.numberOfTickets ?? "1"}
                            className="roboto font-normal text-white"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="roboto font-normal">
                        <SelectItem
                          value="1"
                          className="roboto font-normal text-white"
                        >
                          1
                        </SelectItem>
                        <SelectItem
                          value="2"
                          className="roboto font-normal text-white"
                        >
                          2
                        </SelectItem>
                        <SelectItem
                          value="3"
                          className="roboto font-normal text-white"
                        >
                          3
                        </SelectItem>
                        <SelectItem
                          value="4"
                          className="roboto font-normal text-white"
                        >
                          4
                        </SelectItem>
                        <SelectItem
                          value="5"
                          className="roboto font-normal text-white"
                        >
                          5
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <button className="h-12 border border-[#0E464F] rounded-md text-[#24A0B5] text-center hover:cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="h-12 rounded-md bg-[#24A0B5] text-white text-center hover:cursor-pointer"
              >
                Next
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TicketSelection;

import AddHoliday from "../../components/addHoliday/AddHoliday";
import EditHoliday from "../../components/editHoliday/EditHoliday";
import HolidayList from "../../components/holidayList.tsx/HolidayList";

const Holidays = () => {
  return (
    <div className="bg-slate-100">
      <h2 className="text-2xl border-b-4 py-4 text-center w-full">
        Holiday List
      </h2>
      <HolidayList />
      <AddHoliday />
      <EditHoliday />
    </div>
  );
};
export default Holidays;

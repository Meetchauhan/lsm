import AddHoliday from "../../components/addHoliday/AddHoliday";
import HolidayList from "../../components/holidayList.tsx/HolidayList";

const Holidays = () => {
  return (
    <div className="bg-slate-100">
      <h2 className="text-2xl border-b-4 py-4 text-center w-full">Holiday List</h2>
      <HolidayList />
      <AddHoliday />
    </div>
  );
};
export default Holidays;

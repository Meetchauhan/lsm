import HolidayListForUser from "../../components/holidayListForUser/HolidayListForUser";

const HolidayListPage = () => {
  return (
    <div className="bg-slate-100 pb-10">
      <h2 className="text-2xl border-b-4 py-4 text-center w-full">
        Holiday List
      </h2>
      <HolidayListForUser />
    </div>
  );
};
export default HolidayListPage;

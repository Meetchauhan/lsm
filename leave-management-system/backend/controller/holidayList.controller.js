import HolidayList from "../model/holidaysList.modal.js";

export const AddHoliday = async(req, res)=>{
    const {date, reason} = req.body;
    const addHoliday = new HolidayList({
        
    })
}
import InputModal from "./Input/model";
import MultipleInput from "./MultipleInput/model";
import NumberInput from "./NumberInput/model";
import Radio from "./Radio/model";
import Checkbox from "./Checkbox/model";
import DateTime from "./DateTime/model";
import DateTimeRange from "./DateTimeRange/model";
import Image from "./Image/model";
import Detail from "./Detail/model";
import ExplainText from "./ExplainText/model";
import Amount from "./Amount/model";
import Attachment from "./Attachment/model";
// import ExternalContacts from "./ExternalContacts/model";
import Contacts from "./Contacts/model";
import Departments from "./Departments/model";
import Location from "./Location/model";
import Leave from "./Leave/model";
import PatchCard from "./PatchCard/model";
import Overtime from "./Overtime/model";
import Egress from "./Egress/model";
import BusinessTravel from "./BusinessTravel/model";
import ShiftDuty from "./ShiftDuty/model";
import Become from "./Become/model";
import Quit from "./Quit/model";
import Handover from "./Handover/model";
import AutoTransfer from "./AutoTransfer/model";
import TransferPosition from "./TransferPosition/model";
import Induction from "./Induction/model";
//控件库
const widgets = [
    InputModal,
    MultipleInput,
    NumberInput,
    Radio,
    Checkbox,
    DateTime,
    DateTimeRange,
    Image,
    Detail,
    ExplainText,
    Amount,
    Attachment,
    // ExternalContacts,
    Contacts,
    Departments,
    Location
];
//出勤套件
const works = [
    Leave,
    PatchCard,
    Overtime,
    Egress,
    BusinessTravel,
    ShiftDuty
];
//人事套件
const personnel = [
    Become,
    Quit,
    Handover,
    AutoTransfer, 
    TransferPosition,
    Induction
];
export default {
    widgets,
    works,
    personnel,
    list: [...widgets, ...works, ...personnel]
};
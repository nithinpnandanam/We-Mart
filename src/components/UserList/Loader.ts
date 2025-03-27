// import { json } from "react-router-dom";
// import { getAllRecordingsApi } from "../../../apis/getCandidateAllRecordings";
// import { asyncWrap } from "../../../utils/helper";
// import { ICandidateDetailsLoader } from "../../../router/routes/dashboard/candidateProfile";

// export const loader = async ({ params }: ICandidateDetailsLoader) => {
//     const [_, response] = await asyncWrap(getAllRecordingsApi(params.candidateId));
//     if (response?.data) {
//         return json(response?.data);
//     }
//     throw json("unknown error", 404);
// };
import { aboutModel } from "./about.model";
import { TAbout } from "./about.interface";

///Create About into db
const addAboutIntoDB = async (payload: TAbout) => {
  //   console.log("Payload: ", payload);
  const result = await aboutModel.create(payload);
  return result;
};

//Get All About from DB
const getAllAbout = async () => {
  const result = await aboutModel.find();
  return result;
};

//Update About
const updatAboutIntoDB = async (aboutId: string, payload: TAbout) => {
  //   console.log("User Id in service: ", userId);
  //   console.log("payload in service", payload);

  const result = await aboutModel.findByIdAndUpdate({ _id: aboutId }, payload, {
    new: true,
  });
  return result;
};

export const aboutServices = {
  addAboutIntoDB,
  getAllAbout,
  updatAboutIntoDB,
};

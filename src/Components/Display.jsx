import React, { useState } from "react";
import "./display.css";

function Display({handleChangeHour, hour, stats, month, resolution, handleChangeResolution, isPlaying, handlePausePlay, parameterSelect, handleParamChange, day, handleDayChange}) {

  return (
    <>
      <div className="content_area">
        <div>
          
          <div className="forecast_decription ">
            <h3 className="text-center text-xl font-bold">Activity Monitor</h3>
            <hr className=""/>
            <div className="flex justify-between items-center my-1">
              <h4 className="forecast_tittle text-sm">Active Parameter:</h4>
              <p id="average_nic" className="font-bold text-sm">
                {stats?.activeParam}
              </p>
            </div>
            <div className="flex justify-between items-center my-1">
              <h4 className="forecast_tittle text-sm">Month: </h4>
              <p id="average_nacp" className="font-bold text-sm">
              {stats?.month}
              </p>
            </div>
            <div className="flex justify-between items-center my-1">
              <h4 className="forecast_tittle text-sm">Day: </h4>
              <p id="average_nacv" className="font-bold text-sm">
              {stats?.day}
              </p>
            </div>
            <div className="flex justify-between items-center my-1">
              <h4 className="forecast_tittle text-sm">Hour:</h4>
              <p id="average_sil" className="font-bold text-sm">
              {stats?.hour}
              </p>
            </div>
            <div className="flex justify-between items-center my-1">
              <h4 className="forecast_tittle text-sm">Hex Resolution:</h4>
              <p id="average_sil" className="font-bold text-sm">
              {stats?.hex_res}
              </p>
            </div>
          </div>
        </div>
        <div id="display_id"></div>
      </div>

      <div className="forecast_period">
        <form action="" className="mt-2">
          <div className="container_wrapper">
            <div
              className="flex flex-col items-center"
              style={{ height: "100px" }}
            >
              <div className="flex gap-10">
                <div>
                  <label htmlFor="">Month</label>
                  <select className="rounded-md px-2 py-1" name="" id="">
                    <option>October</option>
                  </select>
                </div>
                <div>
                  <label>Day</label>
                  <select className="rounded-md px-2 py-1" onChange={handleDayChange}>
                  <option value={day}>{day}</option>
                    <option value={"13"}>13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                  </select>
                </div>
              </div>

              <div className="playPausebtn mt-2" onClick={handlePausePlay}>
                {isPlaying ? (
                  <i className="icon fa fa-pause"></i>
                ) : (
                  <i className="icon fa fa-play"></i>
                )}
              </div>
            </div>
            <div className="controller_slider">
              <div className="formContainer mb-6">
                <div>
                  <label htmlFor="hour">Hour</label>
                </div>
                <div>
                  <input
                    type="range"
                    className="rangeInput bg-gray-400"
                    name="hour"
                    id="hour"
                    min="1"
                    max="24"
                    value={hour}
                    onChange={handleChangeHour}
                  />
                  <span id="hourDisplay">{hour}</span>
                </div>
              </div>
              <div className="formContainer ">
                <div>
                  <label htmlFor="resolution" className="">
                    Hex Res:{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="range"
                    onChange={handleChangeResolution}
                    className="rangeInput bg-gray-400"
                    name="resolution"
                    id="resolution"
                    min="0"
                    max="5"
                    value={resolution}
                  />
                  <span id="hexDisplay">{resolution}</span>
                </div>
              </div>
            </div>

            <div className="radioButtonContainer">
              <div className="radio-container">
                <input
                  onChange={handleParamChange}
                  checked={parameterSelect === "nic"}
                  type="radio"
                  id="option3"
                  name="colorOption"
                  value="nic"
                />
                <label htmlFor="option3">
                  NIC
                  <span className="color-indicator color-green"></span>
                </label>
              </div>
              <div className="radio-container">
                <input
                  onChange={handleParamChange}
                  checked={parameterSelect === "nacp"}
                  type="radio"
                  id="option2"
                  name="colorOption"
                  value="nacp"
                />
                <label htmlFor="option2">
                  NACp
                  <span className="color-indicator color-blue"></span>
                </label>
              </div>
              <div className="radio-container">
                <input
                  onChange={handleParamChange}
                  checked={parameterSelect === "nacv"}
                  type="radio"
                  id="option1"
                  name="colorOption"
                  value="nacv"
                />
                <label htmlFor="option1">
                  NACv
                  <span className="color-indicator color-red"></span>
                </label>
              </div>
              <div className="radio-container">
                <input
                  onChange={handleParamChange}
                  checked={parameterSelect === "sil"}
                  type="radio"
                  id="option0"
                  name="colorOption"
                  value="sil"
                />
                <label htmlFor="option0">
                  SIL
                  <span className="color-indicator color-black"></span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Display;

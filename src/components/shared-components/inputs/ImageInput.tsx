import React, { useRef, useState } from "react";
import { Controller } from 'react-hook-form';
import addIcon from "assets/img/fa-icons/plus-solid.svg"
import cancelIcon from "assets/img/fa-icons/xmark-solid.svg"

export default function ImageInput({
  name,
  control,
  label = "Image",
  errorMessage = "",
  parentClasses = "",
  id = "imageUploadId",
  disabled = false,
  defaultValue = '',
  callback = null
}) {
  const handleChange = (e, onChange) => {
    const [img] = e.target.files;

    if (callback) callback(img)

    onChange(img);
  }

  const renderImage = fileUrl => {
    if (!fileUrl) return null;

    const isUrl = typeof fileUrl === 'string';

    return isUrl ? fileUrl : URL.createObjectURL(fileUrl);
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <div className={`fv-row mb-7 image-input${parentClasses ? " " + parentClasses : ''}`}>
            <div className="card-body text-center p-2">
              <div className="image-input image-input-empty image-input-outline mb-3" data-kt-image-input="true">
                <div className="image-input-wrapper w-150px h-150px"
                  style={{ backgroundImage: 'url(' + renderImage(value) + ')' }}>
                </div>
                <label className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow top-7-5-rem"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change"
                  htmlFor={id}>
                  <span className="icon">
                    <img src={addIcon} alt="add icon" />
                  </span>
                  <input type="file"
                    name="avatar"
                    id={id}
                    disabled={disabled}
                    onChange={e => handleChange(e, onChange)}
                  />
                </label>
                <label className="btn btn-icon btn-circle btn-active-color-primary bottom-0 w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-kt-image-input-action-s="remove"
                  data-bs-toggle="tooltip"
                  onClick={() => { onChange(""); }}
                  title="Cancel"
                >
                  <span className="icon">
                    <img src={cancelIcon} alt="cancel icon" />
                  </span>
                </label>
                <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" title="Cancel avatar">
                  <i className="bi bi-x fs-2"></i>
                </span>
                <span className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" title="Remove avatar">
                  <i className="bi bi-x fs-2"></i>
                </span>
              </div>
              <div className="text-muted fs-7">
                {label}
              </div>
            </div>
            {errorMessage && (
              <div className="fv-plugins-message-container invalid-feedback">
                <div>{errorMessage}</div>
              </div>
            )}
          </div>
        )
        }
      />
    </>
  );
}
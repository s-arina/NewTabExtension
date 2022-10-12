import React from 'react';
import Icons from './Icons';
import CustomBgInput from './CustomBgInput';
import ThemeButton from './ThemeButton';

export default function BgSelect({
  bgArray,
  currBg,
  changeBg,
  setTheme,
  theme,
  setCustomInputPopup,
  customInputPopup,
  customInput,
  setCustomInput,
  customTheme,
  setCustomTheme,
}) {
  // icon styling
  const submitIconTheme = customTheme === 'dark' ? '#f2f2f2' : '#000';

  // input field on change
  const onChange = (e) => {
    e.preventDefault();
    setCustomInput(e.target.value);
  };

  // input field on submit
  const onSubmit = (e) => {
    e.preventDefault();

    // save custom image url in local storage
    window.localStorage.setItem('customBg', customInput);
    // update img property in customBg object to the url
    // customBg.img = customInput;
    bgArray[4].img = customInput;

    // bg won't update until refresh
    // force a bg image change on the spot in a way that won't need to wait for state to update
    document.getElementById(
      'bg'
    ).style.backgroundImage = `url("${customInput}")`;

    setCustomInputPopup(false);
  };

  return (
    <div id={`bg-select-${currBg === 'custom' ? customTheme : theme}`}>
      {/* custom background input */}
      {customInputPopup && (
        <CustomBgInput
          onSubmit={onSubmit}
          onChange={onChange}
          customInput={customInput}
          submitIconTheme={submitIconTheme}
        />
      )}

      {/* backgrounds */}
      {bgArray?.map((bg) => (
        <span
          key={bg.id}
          className={currBg === bg.name ? 'active' : ''}
          data-hover={bg.name}
          onClick={() => {
            changeBg(bg.name);
            if (currBg === 'custom') {
              setCustomTheme(customTheme);
            }
            setTheme(bg.theme);
          }}
        ></span>
      ))}

      {/* info icon on presets, edit icon for custom */}
      <Icons
        currBg={currBg}
        customTheme={customTheme}
        theme={theme}
        bgArray={bgArray}
        setCustomInputPopup={setCustomInputPopup}
        customInputPopup={customInputPopup}
      />

      {currBg === 'custom' && (
        <ThemeButton
          customTheme={customTheme}
          setCustomTheme={setCustomTheme}
        />
      )}
    </div>
  );
}

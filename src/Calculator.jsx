import React, { useState, useEffect, useCallback } from "react";
import "./Calculator.css";
import "./index.css";

const Calculator = () => {
  const [res, setRes] = useState(null);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [action, setAction] = useState("");
  const [preview, setPreview] = useState(0);
  const [save, setSave] = useState(null);

  const handleNumClicked = (number) => {
    if (action) {
      const newNum = `${second || ""}${number}`;
      setSecond(Number(newNum));
      setPreview(newNum);
    } else {
      const newNum = `${first || ""}${number}`;
      setFirst(Number(newNum));
      setPreview(newNum);
    }
  };

  const handleResClicked = useCallback(() => {
		setFirst(null)
		setSecond(null)
    switch (action) {
      case "+": {
        setRes(first + second);
        break;
      }
      case "-": {
        setRes(first - second);
        break;
      }
      case "x": {
        setRes(first * second);
        break;
      }
      case "÷": {
        setRes(first / second);
        break;
      }
      case "m+": {
        setSave(res);
        break;
      }
      case "mc":
      case "m-": {
        setSave(null);
        break;
      }
      case "mr": {
        first ? setSecond(save) : setFirst(save);
        setPreview(save);
        break;
      }
      case "c": {
        setRes(null);
        setPreview(0);
        setFirst(null);
        setSecond(null);
        break;
      }
      case "ac": {
        setRes(null);
        setPreview(-0.000000001);
        setFirst(null);
        setSecond(null);
        break;
      }
      default:
        if (!first || !second) {
          setRes(first || second);
          setFirst(null);
          setSecond(null);
        }
		}
  }, [
    setRes,
    setPreview,
    setFirst,
    setSecond,
    action,
    first,
    second,
    res,
    save,
	]);
	
	console.log(first, second)

  useEffect(() => {
    res ? setPreview(res) : setPreview(0);
  }, [res]);

  useEffect(() => {
    action && res && setFirst(res);
  }, [action, res]);

  useEffect(() => {
    if (["c", "ac", "m+", "m-", "mc", "mr"].includes(action)) {
      handleResClicked();
      setAction("");
    }
  }, [action, handleResClicked]);

  return (
    <div className="container">
      <table>
        <tbody>
          <tr>
            <td onClick={setAction} colSpan="4" className="sum">
              <div className="memory">{save ? `M: ${save}` : ""}</div>
              {preview}
              <span className="action-preview">{action}</span>
            </td>
          </tr>
          <tr>
            <td onClick={() => setAction("mr")}>MR</td>
            <td onClick={() => setAction("mc")}>MC</td>
            <td onClick={() => setAction("m+")}>M+</td>
            <td onClick={() => setAction("m-")}>M-</td>
          </tr>
          <tr>
            <td onClick={() => setAction("ac")}>AC</td>
            <td onClick={() => setAction("c")} className="c">
              C
            </td>
            <td onClick={() => handleNumClicked(7)}>-/+</td>
            <td onClick={() => handleNumClicked("÷")}>÷</td>
          </tr>
          <tr>
            <td onClick={() => handleNumClicked(7)}>7</td>
            <td onClick={() => handleNumClicked(8)}>8</td>
            <td onClick={() => handleNumClicked(9)}>9</td>
            <td onClick={() => setAction("x")}>x</td>
          </tr>
          <tr>
            <td onClick={() => handleNumClicked(4)}>4</td>
            <td onClick={() => handleNumClicked(5)}>5</td>
            <td onClick={() => handleNumClicked(6)}>6</td>
            <td onClick={() => setAction("-")}>-</td>
          </tr>
          <tr>
            <td onClick={() => handleNumClicked(1)}>1</td>
            <td onClick={() => handleNumClicked(2)}>2</td>
            <td onClick={() => handleNumClicked(3)}>3</td>
            <td onClick={() => setAction("+")}>+</td>
          </tr>
          <tr>
            <td onClick={() => handleNumClicked(0)}>0</td>
            <td onClick={() => setAction(7)}>.</td>
            <td onClick={() => handleResClicked()} colSpan="2" className="eq">
              =
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calculator;

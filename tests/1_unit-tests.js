const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

let validPuzzle =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

suite("UnitTests", () => {
  suite("solver tests", function () {
    test("Logic handles a valid puzzle string of 81 characters", function (done) {
      let complete =
        "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
      assert.equal(solver.solve(validPuzzle), complete);
      done();
    });
    test("Logic handles a puzzle string that is not 81 characters in length", function (done) {
      let invalidPuzzle =
        "1.5..2.84..63.12.7.2..5.....9..1.234...8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.equal(solver.solve(invalidPuzzle), false);
      done();
    });
    test("Logic handles a puzzle invalid characters", function (done) {
      let invalidPuzzle =
        "1.5..2.84..63.12.7.2..5.abc.9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.equal(solver.solve(invalidPuzzle), false);
      done();
    });
    test("Logic handles invalid row placement", function (done) {
      assert.equal(solver.checkRowPlacement(validPuzzle, "A", "2", "1"), false);
      done();
    });
    test("Logic handles valid row placement", function (done) {
      assert.equal(solver.checkRowPlacement(validPuzzle, "A", "2", "9"), true);
      done();
    });
    test("Logic handles valid column placement", function (done) {
      assert.equal(solver.checkColPlacement(validPuzzle, "A", "2", "8"), true);
      done();
    });
    test("Logic handles invalid column placement", function (done) {
      assert.equal(solver.checkColPlacement(validPuzzle, "A", "9", "1"), false);
      done();
    });
    test("Logic handles valid region (3x3 grid) placement", function (done) {
      assert.equal(
        solver.checkRegionPlacement(validPuzzle, "A", "2", "3"),
        true
      );
      done();
    });
    test("Logic handles invalid region (3x3 grid) placement", function (done) {
      assert.equal(
        solver.checkRegionPlacement(validPuzzle, "A", "2", "1"),
        false
      );
      done();
    });
    test("Valid puzzle strings pass the solver", function (done) {
      assert.equal(
        solver.solve(validPuzzle),
        "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
      );
      done();
    });
    test("Invalid puzzle string fail the solver", function (done) {
      let invalidPuzzle =
        "1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.equal(solver.solve(invalidPuzzle), false);
      done();
    });
    test("Solver returns the expected solution for an incomplete puzzle", function (done) {
      assert.equal(
        solver.solve(
          "..9..5.1.8514....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        ),
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
      );
      done();
    });
  });
});

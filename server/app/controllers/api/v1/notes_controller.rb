class Api::V1::NotesController < ApplicationController
  before_action :find_note, only: [:update, :show, :destroy]
  def index
    @notes = Note.order(:id).reverse
    render json: @notes
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    if @note.valid?
      @note.save
        render json: @note, status: 201
    else
      render json: { errors: @note.errors.full_messages }, status: 202
    end

  end

  def update
    @note.update(note_params)
    if @note.save
      render json: @note, status: :accepted
    else
      render json: { errors: @note.errors.full_messages }, status: 202
    end
  end

  def show
    render json: @note, status: 200
  end

  def destroy
    @note.delete
    render json: @notes, status: 200
  end

  private

  def note_params
    params.permit(:title, :content)
  end

  def find_note
    @note = Note.find(params[:id])
  end
end
